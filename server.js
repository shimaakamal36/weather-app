const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());
app.use(express.static('website'));
const port = 55775;
//listening handler to make sure the server is running
app.listen(port, listening);

function listening() {
    console.log(`We hava a running server on port ${port}`);
}

let projectData = {}; //API endpoint

app.get("/addData", function (req, res) {
    //console.log("hi");
    res.send(projectData);
});
let newEntery;
app.post("/addData", function (req, res) {
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userInput: req.body.userinput
    };
    console.log(`our data is `);
        console.log(projectData);

    
});