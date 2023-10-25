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

function postPlant(plant) {
    let id = plant.db;
    let data = {
        id: id,
        day: plant.day
    }
    axios.post(dbUrlpt1 + '/users/' + localStorage.getItem("user") + '/my_plants' + dbUrlpt2, data);
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
                let plant = convertProxy(plants[userDb]);
                list.push(plant);
            }
        }
        localStorage.setItem("userPlants", JSON.stringify(list));
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
        'difficulity': plant.difficulity
    }
};

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