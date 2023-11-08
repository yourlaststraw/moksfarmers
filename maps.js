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
    let output, euclid, location, userName, plantLoc, postLat, postLon, lonResult, latResult;
    let userLocation = localStorage.getItem("latlon").split(',');
    let userLat = Number(userLocation[0]);
    let userLon = Number(userLocation[1]);

    axios.get(dbUrlpt1 + '/posts' + dbUrlpt2)
    .then(response => {
        for (i in response.data) {
            if (response.data[i].user_id !== session) {
                if (response.data[i].location === undefined) {
                    // console.log('test');
                }
                else {
                    // console.log(response.data[i].first_name, location)
                    // console.log(userLat, userLon, euclid);
                    userName = response.data[i].user_name;
                    location = String(response.data[i].location).split(',');
                    postLat = Number(location[0]);
                    postLon = Number(location[1]);

                    lonResult = Math.pow(userLon - postLon, 2);
                    latResult = Math.pow(userLat - postLat, 2);
                    euclid = Math.sqrt(lonResult + latResult).toFixed(3);

                    if (euclid < 0.05) {
                        output = {
                            user_name: userName
                        }
                        list.push(output);
                    }
                }
                localStorage.setItem("nearbyPlants", JSON.stringify(list));
            }
        }
    });
};

function communityLoad() {
    storeCurrentLocation();
    euclideanDistance();
};