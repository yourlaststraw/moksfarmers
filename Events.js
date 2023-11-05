// Tried out async await on Promise-based
async function loadEvents() {
    const url = dbUrlpt1 + '/events' + dbUrlpt2;

    let events = [];
    let ownEvents = {registered:{},created:{}};

    // What this does is that the code function will wait for the axios to finish calling before running any more code.
    // Normally, a Promise will run all the function's code first, then run the Promise call. So this subverts that problem.
    // This allows us to receive the data on time, instead of always returning 'undefined' outside the .then().
    // If I have time I will try to incorportate this into Buy and Garden. It streamlines the process alot.
    const response = await axios.get(url);

    for (i in response.data) {
        from = new Date(response.data[i].from)
        console.log(from)
        from = from.getMonth()+1 + "/" + from.getDate() + "/" + from.getFullYear()
        console.log(from)
        if (i !== 'dummy') {
            events.push({
                name: response.data[i].name,
                desc: response.data[i].description,
                location: response.data[i].location,
                from: from,
                to: response.data[i].to,
                signup: response.data[i].signup,
                image: response.data[i].image,
                size: response.data[i].size,

            });
            console.log(response.data[i].from)
            // If it is your own created session. It will tell you.
            if (response.data[i].host == session) {
                
                if (ownEvents.created.hasOwnProperty(from)){
                    ownEvents.created[from].push({
                        name: response.data[i].name,
                        desc: response.data[i].description,
                        location: response.data[i].location,
                        to: response.data[i].to,
                        signup: response.data[i].signup,
                        participants: response.data[i].participants,
                        image: response.data[i].image,
                        size: response.data[i].size,
                    });
                }else{
                    ownEvents.created[from] = [
                        {
                            name: response.data[i].name,
                            desc: response.data[i].description,
                            location: response.data[i].location,
                            to: response.data[i].to,
                            signup: response.data[i].signup,
                            participants: response.data[i].participants,
                            image: response.data[i].image,
                            size: response.data[i].size,
                        }
                    ]
                }
                
            }
            else {
                let participants = response.data[i].participants;
                let check = true;
                for (n in participants) {
                    if (n == session) {
                        check = false;
                    }
                }
                if (check === false){
                    if (ownEvents.registered.hasOwnProperty(from)){
                        ownEvents.created[from].push({
                            name: response.data[i].name,
                            desc: response.data[i].description,
                            location: response.data[i].location,
                            to: response.data[i].to,
                            signup: response.data[i].signup,
                            participants: response.data[i].participants,
                            image: response.data[i].image,
                            size: response.data[i].size,
                        });
                    }else{
                        ownEvents.registered[from] = [
                            {
                                name: response.data[i].name,
                                desc: response.data[i].description,
                                location: response.data[i].location,
                                to: response.data[i].to,
                                signup: response.data[i].signup,
                                participants: response.data[i].participants,
                                image: response.data[i].image,
                                size: response.data[i].size,
                            }
                        ]
                    }
                }
            }
        }
    }
    localStorage.setItem('events',JSON.stringify([events,ownEvents]))
    return
};

async function joinEvent(eventId) {
    const url = dbUrlpt1 + '/events/' + eventId + dbUrlpt2;
    const response = await axios.get(url);
    
    let participants = response.data.participants;
    participants[session] = session;

    let data = {
        participants: participants
    };

    axios.patch(url, data)
    .then(() => {
        window.location.reload();
    })
}



