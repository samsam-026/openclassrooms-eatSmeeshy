const express = require('express');
const cors = require('cors');

const port = 3000;

let app = express();

// Default stuff, delete the ones not needed
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// To prevent the browser blocking the server
app.use(cors());

app.listen(port, () => console.log(`App listening on port ${port}!`))
module.exports = app;