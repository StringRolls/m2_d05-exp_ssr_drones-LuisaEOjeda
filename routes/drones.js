const express = require('express');
const Drone = require('../models/Drone.model');
const router = express.Router();

// require the Drone model here
const Drones = require('../models/Drone.model')

router.get('/drones', (req, res) => {
  Drone.find()
  .then((value) => {
    console.log(`${value.length} drones found`)
    res.render ("drones/list", {drones:value})
  })
  .catch((err) => console.log("there was an error retrieving the list of drones: ", err))
});

router
.route('/drones/create')
.get((req, res) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form")
})
.post((req, res) => {
  // Iteration #3: Add a new drone
  Drone.create(req.body)
  .then(() => res.redirect("/drones"))
  .catch(err => res.redirect("/drones/create"))
});

router
.route('/drones/:id/edit')
.get((req, res) => {
  // Iteration #4: Update the drone
  const { id } = req.params
  Drone.findById(id)
  .then(drone => res.render("drones/update-form", drone))
  })
  .post((req, res) => {
  // Iteration #4: Update the drone
  const name = req.body.name;
  const propellers = req.body.propellers;
  const maxSpeed = req.body.maxSpeed;

  Drone.findOneAndUpdate(req.params.id, {name, propellers, maxSpeed})
  .then (updatedDrone => console.log(`The updated drone is ${updatedDrone}`))
  .then ( () => res.redirect("drones"))
  .catch (err => console.log("Unable to update the drone: " + err))
})


router.post('/drones/:id/delete', (req, res) => {
  // Iteration #5: Delete the drone
 Drone.deleteOne({_id: req.params.id})
 .then(() => res.redirect("/drones"))
});

module.exports = router;
