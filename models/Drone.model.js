// Iteration #1

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const droneSchema = new Schema({
  name: { type: "string" },
  propellers: { type: Number },
  maxSpeed: { type: Number },
});

const Drone = mongoose.model("Drone", droneSchema);
module.exports = Drone;
