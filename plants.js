const plants = [];

function dbPlants() {
    let counter = 1;
    axios.get(dbUrlpt1 + '/plants' + dbUrlpt2)
    .then (response => {
        console.log(response.data);
        for (i in response.data) {
            let obj = response.data[i];
            obj['id'] = counter;
            plants.push(obj);
            counter++;
        }
    });
};