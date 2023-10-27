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

// function getCurrentDate() {
//     const today = new Date();
//     const year = today.getFullYear();
//     const month = String(today.getMonth() + 1).padStart(2, '0');
//     const day = String(today.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }

function postPlant(plant) {
    let id = plant.db;
    let data = {
        id: id,
        day: plant.day,
        // loggedDate: getCurrentDate(),
        loggedDate: "",
        location: localStorage.getItem("latlon")
    }
    axios.post(dbUrlpt1 + '/users/' + localStorage.getItem("user") + '/my_plants' + dbUrlpt2, data)
    .then(response => {
        let select = response.data.name;
        localStorage.setItem("newPlant", select);
        axios.patch(dbUrlpt1 + '/users/' + localStorage.getItem("user") + '/my_plants/' + select + dbUrlpt2, {user_plant_id: select});
    });
};

function callPlants() {
    let list = [];
    axios.get(dbUrl)
    .then(response => {
        let plants = response.data.plants;
        let user = response.data.users[session].my_plants;
        for (i in user) {
            if (user[i] !== 'dummy') {
                let userDb = user[i].id;
                let dayTrack = user[i].day;
                let userPlantId = user[i].user_plant_id;
                let plant = modifyPlant(plants[userDb], dayTrack, userDb, userPlantId);
                list.push(plant);
                console.log(plant);
            }
            localStorage.setItem("userPlants", JSON.stringify(list));
        }
    });
};

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

function modifyPlant(plant, dayTrack, userDb, userPlantId) {
    dayTrack = String(dayTrack);
    return {
        'db': userDb,
        'dayTrack': dayTrack,
        'image': plant.image,
        'name': plant.name,
        'description': plant.description,
        'maturity': plant.maturity,
        'size': plant.size,
        'difficulty': plant.difficulty,
        'userPlantId': userPlantId,
        'instructions':getInstructions(plant.steps[`Step ${dayTrack}`].instruction),
    }
};

function getInstructions(instructions) {
    let output = [];
    let arrInstruction = instructions.split(';');
    for (num in arrInstruction) {
        ins = arrInstruction[num].trim();
        if(ins!==""){
        output.push(ins);
    }}
    // console.log(output);
    return output;
} 


function checkCountTally(userPlants, myPlantsList) {
    if (localStorage.getItem("userPlantCount") !== null && localStorage.getItem("userPlantCount") !== 'null') {
        let count = 0;
        let arr;
        if (myPlantsList !== '') {
            arr = myPlantsList.split(',');
            count = arr.length;
        }

        let user = userPlants.length;
        if (count !== user) {
            console.log(count, user)
            window.location.replace("plantStall.html");
        }
    }
    else {
        localStorage.setItem("userPlantCount", userPlants);
    }
};

function loadData() {
    dbPlants();
    callPlants();
    checkCountTally(JSON.parse(localStorage.getItem("userPlants")), localStorage.getItem("userPlantCount"));
};