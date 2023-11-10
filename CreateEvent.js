var image = '';

function addEvent(){
    // This function validates the form for event creation and posts the information to the database
    let url = dbUrlpt1 + '/events' + dbUrlpt2;
    let name = document.getElementById('name').value;
    let description = document.getElementById('description').value;
    let location = document.getElementById('location').value;
    let size = document.getElementById('size').value;
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    let signup = document.getElementById('signup').value;

    let output = '';
    if (name == '') {
        output += `<span>Please enter the event's name.</span><br>`;
    }
    if (description == '') {
        output += `<span>Please enter the description this event.</span><br>`;
    }
    if (location == '') {
        output += `<span>Please the location where this event will be held at.</span><br>`;
    }
    if (size == '') {
        output += `<span>Please enter the maximum number of participants allowed to attend this event.</span><br>`;
    }
    else if (Number(size) < 1) {
        output += `<span>Please enter a valid participant count above 0.</span><br>`;
    }
    if (from == '') {
        output += `<span>Please select this event's starting date.</span><br>`;
    }
    if (to == '') {
        output += `<span>Please select this event's ending date.</span><br>`;
    }
    if (from > to) {
        output += `<span>Your event's starting date cannot be after your ending date.</span><br>`;
    }
    if (signup == '') {
        output += `<span>Please select the latest date that participants can sign up for this event.</span><br>`;
    }
    else if (signup > to) {
        output += `<span>Your latest sign up date cannot be after your event.</span><br>`;
    }
    if (image == '') {
        output += `<span>Please insert an image for this event.</span><br>`;
    }
    if (output !== '') {
        document.getElementById('errors').innerHTML = output;
    }
    else {
        let data = {
            name: name,
            description: description,
            location: location,
            size: size,
            from: from,
            to: to,
            signup: signup,
            image: image,
            host: session,
            participants: {
                dummy: 'dummy'
            }
        };

        axios.post(url, data)
        .then(() => {
            alert('Event Successfully Registered!')
            window.location.replace('Events.html')
        });
    }
}

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      image = reader.result; // The data here is compatible with any img tag src even if it's base64 as it prefixes with 'data:image/jpeg;base64,'
    }
    reader.readAsDataURL(file);
};