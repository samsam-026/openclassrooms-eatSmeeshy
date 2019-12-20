const express = require('express');
const cors = require('cors');

const restaurantsRouter = require("./routes/restaurant");

const port = 5000;

let app = express();

// Default stuff, delete the ones not needed
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To prevent the browser blocking the server
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/restaurants', restaurantsRouter);

app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;