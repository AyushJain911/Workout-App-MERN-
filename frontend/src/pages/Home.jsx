import React, { useEffect, useState } from "react";
import axios from "../axiosConfig.js";

//pages
import WorkoutForm from "../components/WorkoutForm";
import WorkoutDetails from "../components/WorkoutDetails";

//Context
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";
import { useAuthContext } from "../hooks/UseAuthContext.js";

//laoding bar
import LoadingBar from "react-top-loading-bar";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios
        .get("/api/workouts", config)
        .then((response) => {
          // console.log("API Response:", response.data);
          if (response) {
            dispatch({ type: "SET_WORKOUTS", payload: response.data.data });
            setLoading(false);
          }
        })
        .catch((error) => {
          // Handle errors here
          console.error("Error fetching workouts:", error);
          setLoading(false);
        });
    }
  }, [dispatch, user]);

  return (
    <div className="home container">
      <LoadingBar
        color="#fc0303"
        progress={loading ? 100 : 0} // Show loading bar when loading is true
        // onLoaderFinished={() => {}}
        height={5} // Optionally, add a callback when loading is finished
      />
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
