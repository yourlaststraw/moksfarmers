// Calls for Plant Repository from Database
function dbPlants() {
    let counter = 0;
    axios.get(dbUrlpt1 + '/plants' + dbUrlpt2)
    .then (response => {
        let list = [];
        for (i in response.data) {
            let obj = response.data[i];
            obj['id'] = counter;
            obj['db'] = i;
            obj['day'] = 0;
            list.push(obj);
            counter++;
        }
        localStorage.setItem("arrayPlants", JSON.stringify(list));
    });
};

// Date Format Conversion
function convertDateFormat(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

// Creation of user's new plants to the Database
function postPlant(plant) {
    let id = plant.db;
    let data = {
        id: id,
        day: 1, //set day to 1 when plant added so instructions for day1 shows
        loggedDate: '',
        location: localStorage.getItem("latlon"),
        image: plant.image,
        creation_date: new Date(),
    }
    axios.post(dbUrlpt1 + '/users/' + localStorage.getItem("user") + '/my_plants' + dbUrlpt2, data)
    .then(response => {
        // console.log(response)
        let select = response.data.name;
        localStorage.setItem("newPlant", select);
        axios.patch(dbUrlpt1 + '/users/' + localStorage.getItem("user") + '/my_plants/' + select + dbUrlpt2, {user_plant_id: select});
    });
    return true;
};

// Retrieval of User's Plants from Database.
function callPlants() {
    
    axios.get(dbUrl)
    .then(response => {
        let list = [];
        let plants = response.data.plants;
        let user = response.data.users[localStorage.getItem("user")].my_plants;
        
        for (i in user) {
            if (i !== "undefined" && user[i] !== 'dummy') {
                let creation_date = new Date(user[i].creation_date);
                let userDb = user[i].id;
                let dayTrack = Math.ceil((new Date().getTime() - creation_date.getTime())/(1000*60*60*24));
                let userPlantId = user[i].user_plant_id;
                let loggedDate = user[i].loggedDate;
                let image = user[i].image;
                let location = user[i].location;
                
                let plant = modifyPlant(plants[userDb], dayTrack, userDb, userPlantId, loggedDate, image, location, creation_date);
                list.push(plant);
            }
            
        }
        localStorage.setItem("userPlants", JSON.stringify(list));
    });
};

// Re-construction of object to use outside of Proxy or Promise.
function convertProxy(plant) {
    return {
        'db': plant.db,
        'day': plant.day,
        'image': plant.image,
        'name': plant.name,
        'description': plant.description,
        'maturity': plant.maturity,
        'size': plant.size,
        'difficulty': plant.difficulty
    }
};

// Object Reformatting to sync with general format.
function modifyPlant(plant, dayTrack, userDb, userPlantId, loggedDate, image, location, creation_date) {
    return {
        'db': userDb,
        'dayTrack': dayTrack,
        'image': image,
        'name': plant.name,
        'description': plant.description,
        'maturity': plant.maturity,
        'size': plant.size,
        'difficulty': plant.difficulty,
        'userPlantId': userPlantId,
        'instructions':getInstructions(plant.steps[`Step ${dayTrack}`].instruction),
        'logToday': statusLog(loggedDate),
        'location': location,
        'creation_date': creation_date
    }
};

function statusLog(loggedDate){
    let logToday = false;
    let today = convertDateFormat(new Date());
    if(loggedDate==today) { 
        logToday = true;
    }
    return logToday;
}

// Retrieval of Daily Instructions based on Day of User's plant's life
function getInstructions(instructions) {
    let output = [];
    let arrInstruction = instructions.split(';');
    for (num in arrInstruction) {
        ins = arrInstruction[num].trim();
        if(ins!==""){
        output.push(ins);
    }}

    return output;
} 

// Debugging for incomplete information retrieval. Also used to check if Application Storage is synced with Database.
function checkCountTally(userPlants, myPlantsList) {
    if (localStorage.getItem("userPlantCount") !== null && localStorage.getItem("userPlantCount") !== 'null') {
        let count = 0;

        // JSON.parse(JSON.strngify(value)) is used to clean out Proxy(array) values, so that it becomes normal.
        userPlants = JSON.parse(JSON.stringify(userPlants));
        myPlantsList = JSON.parse(JSON.stringify(myPlantsList));
        if (myPlantsList !== '') {
            count = myPlantsList.length;
        }
        
        let user = userPlants.length;
        if (count !== user) {
            userPlants = JSON.stringify(userPlants);
            myPlantsList = JSON.stringify(myPlantsList);
        }
    }
    else {
        localStorage.setItem("userPlantCount", JSON.stringify(userPlants));
    }
};

function loadData() {
    storeCurrentLocation();
};