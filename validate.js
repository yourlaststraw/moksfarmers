// Password Encryption. Uses Crypto.js
function encryptPassword(password, email) {
    return CryptoJS.AES.encrypt(password, email).toString(); // Binds password to an identifier, the user's email
};

// Password Decryption. Uses Crypto.js
function decryptPassword(password, email) {
    return CryptoJS.AES.decrypt(password, email).toString(CryptoJS.enc.Utf8); // Verifies identifier, the user's email to unlock password.
}

// Login Validation
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

// Registration
function createUser() {
    let output = '';
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let phoneNumber = document.getElementById('phoneNumber').value;
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
    if (phoneNumber == '' || phoneNumber.length!=8 || (!(phoneNumber[0]== 8 || phoneNumber[0]==9))) {
        output += `<span>Please enter your phone number correctly.</span><br>`;
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
            let dbEmail, dbPass, dbPhone;
            for (i in response.data) {
                dbEmail = response.data[i].email;
                dbPass = response.data[i].password;
                dbPhone = response.data[i].phoneNumber;

                if (dbEmail == email) {
                    output = `<span>Email address already in use.</span><br>`;
                    document.getElementById('errors').innerHTML = output;
                    counter++;
                }

                else if (dbPhone == phoneNumber) {
                    output = `<span>Phone Number already in use.</span><br>`;
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
                    phoneNumber: phoneNumber,
                    password: encrypted,
                    user_type: 'common',
                    my_plants: {
                        dummy: 'dummy'
                    },
                    current_lat: '',
                    current_lon: ''
                }
                axios.post(url, data)
                .then(() => {
                    document.getElementById('errors').innerHTML = `<span style="color: green;">Account created successfully.</span>`;
                });
            }
        })
    }
    
};

// Logout Storage Clearance
function clearSession() {
    sessionStorage.clear()
    localStorage.clear()
    console.log(sessionStorage)
    console.log(localStorage)
};

// Debugging Functions
function checkLogin() {
    //console.log(userData)
    if (userData!=null && Object.keys(userData).length>0){
        //console.log(4)
        document.getElementsByClassName("button-5")[0].innerHTML = `<div>Logout</div>`
        document.getElementsByClassName("button-5")[0].setAttribute("onclick","clearSession();window.location.replace('redirect.html')")
        document.getElementById("welcome").innerHTML = "Welcome, farmer " + userData.last_name + "!";
        
    }else{
        //console.log(5)
        document.getElementsByClassName("button-5")[0].innerHTML = `<div>Login/Signup</div>`
        document.getElementsByClassName("button-5")[0].setAttribute("onclick","clearSession();window.location.replace('login.html')")
    }
    
}

function checkSession() {
    alert(localStorage.getItem("user"));
}