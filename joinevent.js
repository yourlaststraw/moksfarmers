// Tried out async await on Promise-based
async function loadEvents() {
    const url = dbUrlpt1 + '/events' + dbUrlpt2;

    let output;

    // What this does is that the code function will wait for the axios to finish calling before running any more code.
    // Normally, a Promise will run all the function's code first, then run the Promise call. So this subverts that problem.
    // This allows us to receive the data on time, instead of always returning 'undefined' outside the .then().
    // If I have time I will try to incorportate this into Buy and Garden. It streamlines the process alot.
    const response = await axios.get(url);

    for (i in response.data) {
        if (i !== 'dummy') {
            // If it is your own created session. It will tell you.
            if (response.data[i].host == session) {
                output += `<label><b>Your Session</b></label>`
            }
            output += `
                <div>
                    <p>` + response.data[i].name + `</p>
                    <p>` + response.data[i].description + `</p>
                    <p>` + response.data[i].location + `</p>
                    <p>From: ` + response.data[i].from + `</p>
                    <p>To: ` + response.data[i].to + `</p>
                    <p>Sign Up By: ` + response.data[i].signup + `</p>
                </div>
                </br>
            `;
        }
    }
    document.getElementById("events").innerHTML = output;
};
