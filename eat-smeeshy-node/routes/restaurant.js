const express = require('express');
const router = express.Router();
const fileHandler = require("../utils/fileHandler");
const databaseLocations = require("../utils/databaseLocation");

router.get("/", function (req, res, next) {
    let restaurants = fileHandler.getJsonFile(databaseLocations.restaurant);
    let restList = restaurants.sort((a, b) => a.rating > b.rating ? -1 : a.rating < b.rating ? 1 : 0);
    res.send(restList);
});

module.exports = router;