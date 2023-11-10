// Google Maps API Location Retrieval
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

// Verification and update of obtained location from Google Maps API into Database.
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
    if(current !=null)
    {arr = current.split(",");
    lat = arr[0];
    lon = arr[1];
    data = {
        current_lat: lat,
        current_lon: lon
    }
    axios.patch(dbUserUrl, data);}
};

// Calculation of Euclidean Distance between User and nearby posts. Also the retrieval of posts from Database.
function euclideanDistance() {
    let userList = [];
    let othersList = [];
    let output, euclid, location, postLat, postLon, lonResult, latResult;
    let userLocation = '';
    if(localStorage.getItem("latlon") !=null){
        userLocation = localStorage.getItem("latlon").split(',');
    }
    let userLat = Number(userLocation[0]);
    let userLon = Number(userLocation[1]);

    axios.get(dbUrlpt1 + '/posts' + dbUrlpt2)
    .then(response => {
        for (i in response.data) {
            let post = response.data[i];
            if (post.user_id !== session) {
                if (post.location === undefined) {
                    // console.log('test');
                }
                else {
                    // console.log(post.first_name, location)
                    // console.log(userLat, userLon, euclid);
                    location = String(post.location).split(',');
                    postLat = Number(location[0]);
                    postLon = Number(location[1]);

                    lonResult = Math.pow(userLon - postLon, 2);
                    latResult = Math.pow(userLat - postLat, 2);
                    euclid = Math.sqrt(lonResult + latResult).toFixed(3);

                    if (euclid < 0.05) {
                        output = {
                            user_name: post.user_name,
                            date: post.date,
                            image: post.image,
                            post_name: post.post_name,
                            description: post.description,
                        }
                        othersList.push(output);
                    }
                }
                localStorage.setItem("nearbyPlants", JSON.stringify(othersList));
            }
            else {
                output = {
                    user_name: post.user_name,
                    date: post.date,
                    image: post.image,
                    post_name: post.post_name,
                    description: post.description,
                }
                userList.push(output);
            }
            localStorage.setItem("myOwnPlants", JSON.stringify(userList));
        }
    });
};

function communityLoad() {
    storeCurrentLocation();
    euclideanDistance();
};