function dbPlants() {
    let counter = 1;
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
        sessionStorage.setItem("arrayPlants", JSON.stringify(list));
    });
};

function postPlant(id) {
    let data = {
        id: id,
        day: 0
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
                let day = user[i].day;
                let userDb = user[i].id;
                let plant = {'image': plants[userDb].image, 'name': plants[userDb].name, 'day': String(day), 'description': description};
                list.push(plant);
            }
        }
        sessionStorage.setItem("plantList", JSON.stringify(list));
    });
};

const plantList = JSON.parse(sessionStorage.getItem("plantList"));