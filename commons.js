const relay = `// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
                                                        
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCCS5v_6R5eh3awjly6RpX4robuOXVAz-s",
    authDomain: "moksfarmers.firebaseapp.com",
    projectId: "moksfarmers",
    storageBucket: "moksfarmers.appspot.com",
    messagingSenderId: "737487778339",
    appId: "1:737487778339:web:f8f48a2bb87973dafe3796",
    measurementId: "G-E1Q2CMXC9E"
};
                                                        
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);`;

document.getElementsByTagName('script')[0].innerHTML = relay;

const dbUrl = 'https://moksfarmers-default-rtdb.asia-southeast1.firebasedatabase.app.json?auth=WeVoR13Scj5QXT9M16uBsXxq48YOdELozmMA50ny';

const dbUrlpt1 = 'https://moksfarmers-default-rtdb.asia-southeast1.firebasedatabase.app';
const dbUrlpt2 = '.json?auth=WeVoR13Scj5QXT9M16uBsXxq48YOdELozmMA50ny';

const dbUserUrl = 'https://moksfarmers-default-rtdb.asia-southeast1.firebasedatabase.app/users/' + localStorage.getItem("user") + '.json?auth=WeVoR13Scj5QXT9M16uBsXxq48YOdELozmMA50ny';