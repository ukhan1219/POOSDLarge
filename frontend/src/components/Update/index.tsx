import "./update.css";
import { useEffect, useState } from "react";

function Update({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const [exercisedDays, setExercisedDays] = useState(0);

  const userId = user?.id || null;

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `https://group9.xyz/api/getAllWorkouts/${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data);

        const exercisedSet = new Set(
          data.map((workout) => new Date(workout.Date).toDateString()),
        );
        setExercisedDays(exercisedSet.size);
      } catch (error) {
        console.error("Error fetching workout data:", error);
      }
    };

    fetchWorkouts();
  }, [userId]);

  return (
    <div className="update-container">
      <p>Welcome back {user?.name || "Guest"}!</p>
      <p>You have worked out {exercisedDays} days this month.</p>
    </div>
  );
}

export default Update;
