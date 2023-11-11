import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  getAllWorkout,
  creatingingWorkOut,
  findWorkoutById,
  updatingWorkout,
  deletingWorkoutById,
} from "../controller/workoutController.js";

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth);

//get all the workout route
router.get("/", getAllWorkout);

//new workout route
router.post("/", creatingingWorkOut);

//get a workout by ID
router.get("/:id", findWorkoutById);

//updating a workout
router.patch("/:id", updatingWorkout);

//delete a workout
router.delete("/:id", deletingWorkoutById);

// best way to export file in nodejs
// module.exports = router;
// we can also do this
export default router;
