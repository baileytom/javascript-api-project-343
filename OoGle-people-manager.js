// the api toolkit for making REST systems easily
const express = require('express');
// A good solution for handling JSON data in routes
const bodyParser = require('body-parser');
// Node JS modules for filesystem access
const fs = require('fs');
// Our database connection
// This will be a JSON object of our programmers
// and can be accessed as if it was any other javascript
// object
const database = [require('./programmers.json')];
// Make an instance of our express application
const app = express();
// Specify our > 1024 port to run on
var port = 2102;
// Apply our middleware so our code can natively handle JSON easily
app.use(bodyParser.json());

// We must have our list of programmers to use
if (!fs.existsSync('./programmers.json')) {
    throw new Error('Could not find database of programmers!');
}

// Return a person by ID
const getPerson = (id) => {
    return database.filter(i => i.SID === id.toString())[0] || undefined;
};

// Update a person's info
const updatePerson = (update, index) => {
    console.log(update);
    console.log(index);
    for(let i in update){
	console.log(i);
	console.log(database[index]);
	console.log(database[index][i]);
	if(!(database[index][i] == undefined || i == "SID")){
	    console.log("updating " + i);
	    database[index][i] = update[i];
	}
    }
};

// Send all our people to the user
app.get('/', (req, res) => {
    res.send(database);
});

// Gets a person by ID and send it to the user
app.get('/:id', (req, res) => {
    res.send(getPerson(req.params.id));
});

// Update the info for a particular user
app.put('/:id', (req, res) => {
    console.log("Handing put")
    const position = database.indexOf(getPerson(req.params.id));
    console.log(position);
    updatePerson(req.body, position);
    res.sendStatus(200);
});

// Create a new person in the database
app.post('/', (req, res) => {
    console.log("Handling post")
    const body = req.body; // Hold your JSON in here!
    database.push(body);
    res.sendStatus(200);
});

// Handle invalid routes
app.all('*', (req, res) => {
    res.send('Error, invalid route.');
})

app.listen(port, () => {
    console.log(`She's alive on port ${port}`);
});
