const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here
const Drones = require('../models/Drone.model')

router.get('/drones', (req, res, next) => {
  Drone.find()
  .then((value) => {
    console.log(`${value.length} drones found`)
    res.render ("drones/list", {drones:value})
  })
  .catch((err) => console.log("there was an error retrieving the list of drones: ", err))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  Drone.create(req.body)
  .then(() => res.redirect("/drones"))
  .catch(err => res.redirect("/drones/create"))
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  Drone.findById(id)
  .then(drone => res.render("drones/update-form", drone))
  })

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.findOneAndUpdate(req.params.id, {name, propellers, maxSpeed})
  .then (updatedDrone => console.log(`The updated drone is ${updatedDrone}`))
  .then ( () => res.redirect("drones"))
 });

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
 Drone.deleteOne({_id: req.params.id})
 .then(() => res.redirect("/drones"))
});

module.exports = router;
