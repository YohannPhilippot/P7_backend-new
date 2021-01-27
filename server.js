const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const userRoutes = require('./routes/user')
const postRoutes = require('./routes/posts')

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});