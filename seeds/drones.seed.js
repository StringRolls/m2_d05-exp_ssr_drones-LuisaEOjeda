// Iteration #1

const mongoose = require("mongoose");
const Drone = require("../models/Drone.model");
require("../db/index");

const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 },
];

Drone.deleteMany()
.then(() =>{

    Drone.create(drones)
    .then((dronesObj) => {
        console.log(`${dronesObj.length} drones have been added to the database`)
        mongoose.connection.close()
    })
})
.catch((err) => console.log("Opps there was an error: ", err))