const port = 3000;
const fs = require('fs');
const axios = require('axios');
const express = require('express');
const app = express();
const categories = require ('./categories.json');
app.use(express.json());
const seedCategories = require ("./jservice-client");

const categoriesArray = [21, 67, 680, 309, 582, 267];
const categoriesFile = "./categories.json";

seedCategories(categoriesArray, categoriesFile);

app.use(express.json());
app.use(express.static("public"));
    
const json = fs.readFileSync(categoriesFile);
const parseCat = JSON.parse(json);

app.get('/api/category/:id', (req, res) => {
    console.log('inside app.get');
    const requestedCategory = categories.find(category => category.id == req.params.id);
    console.log(requestedCategory);
    res.send(requestedCategory);
})


app.listen(port, ()=> console.log("it's working!"));

// const HTTPClient = require("./axiosAsync.js");
// const fs = require("fs");
// const url = "http://jservice.io/api/category?id=";
// const categoriesArray = [21, 67, 680, 309, 582, 267];
// const categoryPromises = categoriesArray.map(id => HTTPClient(url + id))

// Promise.all(categoryPromises)
//     .then(categories => fs.writeFileSync("./categories.json", JSON.stringify(categories)));