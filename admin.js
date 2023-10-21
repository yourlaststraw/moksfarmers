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
    
    if (output !== '') {
        document.getElementById('errors').innerHTML = output;
    }
    else {
        let data = {
            name: name,
            size: size,
            maturity: maturity,
            difficulity: difficulity,
        }
        axios.post(url, data);
    }
}