const express = require('express');
const router = express.Router();
const axios = require("axios");
const fileHandler = require("../utils/fileHandler");
const databaseLocations = require("../utils/databaseLocation");
const env = require("../env");

router.get("/", function (req, res, next) {
    let restaurants = fileHandler.getJsonFile(databaseLocations.restaurant);
    let restList = restaurants.sort((a, b) => a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0);
    res.send(restList);
});


router.post("/", function (req, res, next) {
    let { lat, lng } = req.body;

    axios.get("https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=" + lat + "," + lng + "&radius=2000&type=restaurant&key=" + env.googleApi)
        .then(function (placesData) {
            let placesArray = placesData.data.results.map(item => {
                return {
                    ...item,
                    rating: item.rating && item.rating > 0 && item.rating <= 5 ? item.rating : 1,
                    price_level: item.price_level && item.price_level > 0 && item.price_level <= 4 ? item.price_level : (Math.floor(Math.random() * 4) + 1)
                }
            });
            res.send(placesArray);
        })
        .catch(error => console.error(error));
});

router.post("/address", function (req, res, next) {
    let { lat, lng } = req.body;

    axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + env.googleApi)
        .then(function (placesData) {
            let placesObj = placesData.data.results[0];
            let { formatted_address, place_id } = placesObj;
            res.send({ formatted_address, place_id });
        })
        .catch(error => console.error(error));
});

module.exports = router;