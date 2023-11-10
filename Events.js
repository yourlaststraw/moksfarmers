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
        from = from.getMonth()+1 + "/" + from.getDate() + "/" + from.getFullYear()
        if (i !== 'dummy') {
            events.push({
                id: i,
                name: response.data[i].name,
                desc: response.data[i].description,
                location: response.data[i].location,
                from: from,
                to: response.data[i].to,
                signup: response.data[i].signup,
                image: response.data[i].image,
                size: response.data[i].size,
                participants: response.data[i].participants,

            });
            // If it is your own created session. It will tell you.
            if (response.data[i].host == session) {
                
                if (ownEvents.created.hasOwnProperty(from)){
                    ownEvents.created[from].push({
                        id: i,
                        name: response.data[i].name,
                        desc: response.data[i].description,
                        location: response.data[i].location,
                        from: from,
                        to: response.data[i].to,
                        signup: response.data[i].signup,
                        participants: response.data[i].participants,
                        image: response.data[i].image,
                        size: response.data[i].size,
                    });
                }else{
                    ownEvents.created[from] = [
                        {
                            id: i,
                            name: response.data[i].name,
                            desc: response.data[i].description,
                            location: response.data[i].location,
                            from: from,
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
                        ownEvents.registered[from].push({
                            id: i,
                            name: response.data[i].name,
                            desc: response.data[i].description,
                            location: response.data[i].location,
                            from: from,
                            to: response.data[i].to,
                            signup: response.data[i].signup,
                            participants: response.data[i].participants,
                            image: response.data[i].image,
                            size: response.data[i].size,
                        });
                    }else{
                        ownEvents.registered[from] = [
                            {
                                id: i,
                                name: response.data[i].name,
                                desc: response.data[i].description,
                                location: response.data[i].location,
                                from: from,
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
    return [events,ownEvents]
};

async function joinEvent(eventId,name,email,phone) {
    console.log(1)
    const url = dbUrlpt1 + '/events/' + eventId + dbUrlpt2;
    const response = await axios.get(url);
    console.log(response)
    if (response.data.hasOwnProperty('participants')){
        plist = response.data.participants
        plist[localStorage.getItem('user')] = {name:name,email:email,phone:phone}
    }else{
        plist = {[localStorage.getItem('user')]: {name:name,email:email,phone:phone}}
    }
    // let participants = response.data.participants;
    // participants[session] = session;
    // console.log(participants)
    // let data = {
    //     participants: participants
    // };
    
    let data = {
        participants: plist
    }

    axios.patch(url, data)
    .then(() => {
        console.log('Sign up successful')
    })

}



