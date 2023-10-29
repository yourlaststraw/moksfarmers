function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    localStorage.setItem("locationPermission", navigator.geolocation.getCurrentPosition(showPosition));
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    localStorage.setItem("latlon", lat + ',' + lon);
}

function storeCurrentLocation() {
    console.log(sessionStorage.getItem("checkLocation"))
    if (sessionStorage.getItem("checkLocation") !== 'greenlit') {
        sessionStorage.setItem("checkLocation", 'greenlit');
        getLocation();
        if (!window.location.hash) {
            setTimeout(function(){
                window.location += '#';
                window.location.reload();
            }, 2000); // 2000 = 2s
            
        }
    }
    let current;
    current = localStorage.getItem("latlon");
    arr = current.split(",");
    lat = arr[0];
    lon = arr[1];
    data = {
        current_lat: lat,
        current_lon: lon
    }
    axios.patch(dbUserUrl, data);
};

function euclideanDistance() {
    let list = [];
    let output, plants, euclid, location, plantLoc, postLat, postLon;

    axios.get(dbUrlpt1 + '/users' + dbUrlpt2)
    .then(response => {
        for (i in response.data) {
            let userLat = response.data[session].current_lat;
            let userLon = response.data[session].current_lon;
            if (i !== session) {
                plants = response.data[i].my_plants;
                for (n in plants) {
                    if (plants[n] !== 'dummy') {
                        location = plants[n].location;
                        plantLoc = location.split(",");
                        postLat = plantLoc[0];
                        postLon = plantLoc[1];
                        euclid = Math.sqrt(((Number(userLon) - Number(postLon)) ** 2) - ((Number(userLat) - Number(postLat)) ** 2)) * 100;
                        if (euclid < 0.2 || Number.isNaN(euclid)) { // NaN means that the distance is so miniscule that it is not readable.
                            output = {                              // aka. basically right next to you.
                                user: i,
                                id: plants[n].id,
                                location: location,
                                day: plants[n].day,
                                loggedDate: plants[n].loggedDate,
                                user_plant_id: plants[n].user_plant_id
                            }
                            list.push(output);
                        }
                    }
                    console.log(euclid, output);
                    localStorage.setItem("nearbyPlants", JSON.stringify(list));
                }
            }
        }
    });
}