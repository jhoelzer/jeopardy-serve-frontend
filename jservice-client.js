const fs = require('fs');
const axios = require('axios');
const HTTPClient = require('./axiosAsync.js');
const url = 'http://jservice.io/api/category?id=';
const categoriesFile = "./categories.json";
const categories = require ('./categories.json');

module.exports = function (categoriesArray, categoriesFile) {
    const categoryResponsePromises = categoriesArray.map(id => HTTPClient(url + id));

    Promise.all(categoryResponsePromises)
    .then(categoriesResponses => {
        const categories2 = categoriesResponses.map(res => res.data);
        fs.writeFileSync(categoriesFile, JSON.stringify(categories));
    })
}