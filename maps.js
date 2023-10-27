function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    localStorage.setItem("latlon", [lat, lon]);
}

function euclideanDistance(lati, long) {
    let data = [];
    let plants, euclid, current, lat, lon;
    getLocation();
    current = localStorage.getItem("latlon");
    current = current.split(',');
    lat = current[0];
    lon = current[1];

    axios.get(dbUserUrl)
    .then(response => {
        for (i in response.data) {
            if (i !== session) {
                plants = response.data.my_plants;
                for (n in plants) {
                    let location = plants[n].location;
                    let plantLoc = location.split(',');
                    let postLat = plantLoc[0];
                    let postLon = plantLoc[1];
                    euclid = Math.sqrt(((lon - postLon) ** 2) - ((lat - postLat) ** 2)) * 100;

                    if (euclid < 0.2) {
                        data.push(plants[n]);
                    }
                }
            }
        }
        localStorage.setItem("nearbyPlants", JSON.stringify(data));
    });
}