import { Workout } from "../model/model.js";
import mongoose from "mongoose";

//get all the workout function
const getAllWorkout = async (req, res) => {
  try {
    const user_id = req.user._id;
    const workout = await Workout.find({ user_id }).sort({ createdAt: -1 });
    res.status(201).send({ count: workout.length, data: workout });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

//Create a workout function
const creatingingWorkOut = async (req, res) => {
  const { title, load, reps } = req.body;
  // console.log(req);

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getting a workout by ID
const findWorkoutById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout ID" });
  }
  try {
    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ message: "No such workout" });
    }
    return res.status(201).send(workout);
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "Server error" });
  }
};

//Updating a workout
const updatingWorkout = async (req, res) => {
  const { id } = req.params;
  const { title, reps, load } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout ID" });
  }

  try {
    if (!title && !reps && !load) {
      return res.status(400).json({
        message: "At least one field must be provided for the update.",
      });
    }

    const updatedFields = {};
    if (title) updatedFields.title = title;
    if (reps) updatedFields.reps = reps;
    if (load) updatedFields.load = load;

    const workout = await Workout.findByIdAndUpdate(
      id,
      { title, reps, load },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: "No such workout" });
    }

    return res.status(200).send(workout);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//delete a workout
const deletingWorkoutById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid workout ID" });
  }
  try {
    const workout = await Workout.findByIdAndDelete(id);
    if (!workout) {
      return res.status(404).json({ message: "No such workout" });
    }
    return res.status(201).send(workout);
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export {
  getAllWorkout,
  creatingingWorkOut,
  findWorkoutById,
  updatingWorkout,
  deletingWorkoutById,
};
