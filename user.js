const session = localStorage.getItem("user"); // Calls the logged in user's Unique ID.

axios.get(dbUserUrl)
.then(response => {
    // Checks if a User has logged in. If there is nothing in the session, the whole page will be locked.
    // If the user's ID is stored in the session, the following will pull the user's information from the database and store it locally.
    if (session !== null) {
        // sessionStorage cannot store JSON objects, so we need to convert it into a string first.
        localStorage.setItem("userData", JSON.stringify(response.data));
        const lockedOut = false;
    }
});
// Once we are out of the axios call, we can reconvert it into an object.
const userData = JSON.parse(localStorage.getItem("userData"));

// Important to note:
// localStorage utilises your browser's cookies functionality to indefinitely store data on your client.
// This is more often used for unique IDs that cannot be cracked that easily.

// sessionStorage only stores the information on your client until it is closed.
// This is used when temporary data is needed for that one instance only.