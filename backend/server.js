import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv/config";

import workoutRouter from "./routes/Workout.js";
import userRouter from "./routes/User.js";

// express app
const app = express();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRouter);
app.use("/api/user", userRouter);

//connect to Database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    //listen for request
    app.listen(port, (req, res) => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
