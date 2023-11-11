import { useParams } from "react-router-dom";
import axios from "../axiosConfig.js";
import { useWorkoutsContext } from "../hooks/UseWorkoutsContext";
import { useAuthContext } from "../hooks/UseAuthContext.js";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const handleDelete = () => {
    if (!user) {
      return;
    }
    const id = workout._id;

    axios
      .delete(`/api/workouts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((response) => {
        dispatch({ type: "DELETE_WORKOUT", payload: response.data });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Number of reps: </strong>
        {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleDelete}>Delete</span>
    </div>
  );
};

export default WorkoutDetails;
