var image = '';

// Checking to see if admin account is trying to enter
if (userData.email !== 'moksfarmers@gmail.com') {
    document.write('You do not have access to this page');
    window.stop();
}

// Similar to register user, but for the plants.
function addPlant() {
    let output = '';
    let name = document.getElementById('name').value;
    let size = document.getElementById('size').value;
    let maturity = document.getElementById('maturity').value;
    let difficulity = document.getElementById('difficulity').value;
    let desc = document.getElementById('desc').value;
    let steps = document.getElementById('steps').value;

    let stepsArray = steps.split('//');
    let stepsObj = {};

    for (let i = 0; i < stepsArray.length; i++) {
        let counter = 'Step ' + String(i + 1);
        stepsObj[counter] = {'instruction': stepsArray[i], 'day': String(i + 1)}
    };
 
    let url = dbUrlpt1 + '/plants' +  dbUrlpt2;
    if (name == '') {
        output += `<span>Please enter the plant's name.</span><br>`;
    }
    if (maturity == '') {
        output += `<span>Please enter the duration for until maturity.</span><br>`;
    }
    if (difficulity == '') {
        output += `<span>Please select the difficulity level of growing this plant.</span><br>`;
    }
    else if (Number(difficulity) > 10 || Number(difficulity) < 1) {
        output += `<span>Difficulity level not in range.</span><br>`;
    }
    if (desc == '') {
        output += `<span>Please enter the description this plant.</span><br>`;
    }
    if (steps == '') {
        output += `<span>Please enter the steps to growing this plant in the correct format.</span><br>`;
    }
    if (image == '') {
        output += `<span>Please insert an image for this plant.</span><br>`;
    }


    if (output !== '') {
        document.getElementById('errors').innerHTML = output;
    }
    else {
        let data = {
            name: name,
            size: size,
            maturity: maturity,
            difficulity: difficulity,
            description: desc,
            steps: stepsObj,
            image: image
        }
        if (axios.post(url, data)){
        window.alert('Plant added successfully!');
        window.location.href = 'addplants.html';}
        else {
            window.alert('Failed to add plant!');
        }
    }
};

// This function takes the inputted image file, and converts it into base64 string.
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
      image = reader.result; // The data here is compatible with any img tag src even if it's base64 as it prefixes with 'data:image/jpeg;base64,'
    }
    reader.readAsDataURL(file);
  }