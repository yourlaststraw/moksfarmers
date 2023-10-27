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
    let output = '';
    let hougang = {
        lat: 1.3798,
        lng: 103.8882
    };
    let bishan = {
        lat: 1.350986,
        lng: 103.848255
    };
    let euclidHougang = Math.sqrt(((long - hougang.lng) ** 2) - ((lati - hougang.lat) ** 2)) * 100;
    let euclidBishan = Math.sqrt(((long - bishan.lng) ** 2) - ((lati - bishan.lat) ** 2)) * 100;
    data.push({
        location: 'Hougang',
        euclidDist: euclidHougang
    })
    data.push({
        location: 'Bishan',
        euclidDist: euclidBishan
    })

    // Determine if the User is nearby enough to the set locations based on a fixed parameter.
    for (i in data) {
        if (data[i].euclidDist < 2) {
            output += data[i].location + ' is close enough.<br>';
        }
        else {
            output += data[i].location + ' is too far.<br>';
        }
    }
    document.getElementById('insight').innerHTML = output;
}