function getLocation() {
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
    localStorage.setItem("locationPermission", navigator.geolocation.getCurrentPosition(showPosition));
    }
    else {
        localStorage.removeItem("checkLocation");
        alert('Location Services needed to load this page. Please enable it.');
    }
}

function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    localStorage.setItem("latlon", lat + ',' + lon);
}

function storeCurrentLocation() {
    //console.log(sessionStorage.getItem("checkLocation"))
    if (sessionStorage.getItem("checkLocation") !== 'greenlit') {
        sessionStorage.setItem("checkLocation", 'greenlit');
        getLocation();
        if (!window.location.hash) {
            setTimeout(function(){
                window.location += '#';
                window.location.reload();
            }, 3000); // 2000 = 2s
            
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
    let output, plants, euclid, location, plantLoc, postLat, postLon, lonResult, latResult, result;

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
                        if (location === undefined) {
                            console.log('test');
                        }
                        else {
                            console.log(response.data[i].first_name, location)
                            plantLoc = location.split(",");
                            userLat = Number(userLat);
                            userLon = Number(userLon);
                            postLat = Number(plantLoc[0]);
                            postLon = Number(plantLoc[1]);
                            lonResult = Math.pow(userLon - postLon, 2);
                            latResult = Math.pow(userLat - postLat, 2);
                            euclid = Math.sqrt(lonResult + latResult).toFixed(3);
                            console.log(userLat, userLon, euclid);
                            if (euclid < 0.03) {
                                output = {
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
                    }
                    //console.log(euclid, output);
                    localStorage.setItem("nearbyPlants", JSON.stringify(list));
                }
            }
        }
    });
};

function communityLoad() {
    storeCurrentLocation();
    euclideanDistance();
}