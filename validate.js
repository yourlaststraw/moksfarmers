function encryptPassword(password, email) {
    return CryptoJS.AES.encrypt(password, email).toString();
};

function decryptPassword(password, email) {
    return CryptoJS.AES.decrypt(password, email).toString(CryptoJS.enc.Utf8);
}

function verifyUser() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let output = '';

    if (email == '' || password == '') {
        if (email == '') {
            output += `<span>Please enter your email address.</span><br>`;
        }
        if (password == '') {
        output += `<span>Please enter your password.</span><br>`;
        }
        document.getElementById('errors').innerHTML = output;
    }
    else {
        axios.get(dbUrlpt1 + '/users' +  dbUrlpt2)
        .then(response => {
            let decrypted;
            let counter = 0;
            let keys = Object.keys(response.data);
            let session;
            for (i in response.data) {
                if (response.data[i].email == email) {
                    decrypted = decryptPassword(response.data[i].password, email);
                    session = keys[counter];
                } 
                else {
                    counter++
                }
            }
            if (decrypted == password) {
                localStorage.setItem("user", session);
                window.location.replace("redirect.html");
            }
            else {
                document.getElementById('errors').innerHTML = `<span>Email address/ Password is incorrect.</span>`
            }
        });
    }
};

function createUser() {
    let output = '';
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('confirmPassword').value;
    let url = dbUrlpt1 + '/users' +  dbUrlpt2;
    let counter = 0;

    if (firstName == '') {
        output += `<span>Please enter your first name.</span><br>`;
    }
    if (lastName == '') {
        output += `<span>Please enter your last name.</span><br>`;
    }
    if (email == '' || !email.includes('@')) {
        output += `<span>Please enter your email address.</span><br>`;
    }
    if (password == '') {
        output += `<span>Please enter a password.</span><br>`;
    }
    else if (password !== confirmPassword) {
        output += `<span>Passwords do not match.</span><br>`;
    }
    
    if (output !== '') {
        document.getElementById('errors').innerHTML = output;
    }
    else {
        axios.get(url)
        .then(response => {
            let dbEmail, dbPass;
            for (i in response.data) {
                dbEmail = response.data[i].email;
                dbPass = response.data[i].password;

                if (dbEmail == email) {
                    output = `<span>Email address already exists.</span><br>`;
                    document.getElementById('errors').innerHTML = output;
                    counter++;
                }
                
            }

            if (counter == 0) {
                let encrypted = encryptPassword(password, email)
                let data = {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    password: encrypted,
                    user_type: 'common',
                    my_plants: {
                        dummy: 'dummy'
                    }
                }
                axios.post(url, data)
                .then(() => {
                    document.getElementById('errors').innerHTML = `<span>Account created successfully.</span>`;
                });
            }
        })
    }
    
};

function clearSession() {
    localStorage.removeItem("user");
    localStorage.removeItem("userPlants");
    localStorage.removeItem("userPlantCount");
    localStorage.removeItem("latlon");
    localStorage.removeItem("nearbyPlants");
    sessionStorage.removeItem("userData");
};

function checkSession() {
    alert(localStorage.getItem("user"));
}