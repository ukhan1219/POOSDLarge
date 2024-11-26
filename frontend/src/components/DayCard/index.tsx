import { useState, useEffect } from "react";
import "./daycard.css";
import { useAuth } from "../../authentication";

function DayCard({ chosenDay, workout, setSelectedOption }) {
  const { user } = useAuth();
  const userId = user?.id;

  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [notes, setNotes] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const muscleGroups = [
    "Biceps",
    "Triceps",
    "Chest",
    "Back",
    "Shoulders",
    "Legs",
  ];

  useEffect(() => {
    if (workout) {
      setSelectedMuscleGroups(workout.MuscleGroup || []);
      setNotes(workout.Text || "");
    } else {
      setSelectedMuscleGroups([]);
      setNotes("");
    }
  }, [workout]);

  const handleMuscleGroupSelect = (group) => {
    setSelectedMuscleGroups((prev) =>
      prev.includes(group) ? prev.filter((g) => g !== group) : [...prev, group],
    );
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      console.error("No user ID found. Ensure the user is authenticated.");
      return;
    }

    const workoutData = {
      dateString: chosenDay,
      MuscleGroup: selectedMuscleGroups,
      Text: notes,
      UserID: userId,
    };

    const apiUrl = workout
      ? `http://localhost:3000/api/editWorkout/${workout.WorkoutID}`
      : `http://localhost:3000/api/addWorkout`;

    try {
      const response = await fetch(apiUrl, {
        method: workout ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workoutData),
      });

      if (!response.ok) {
        throw new Error("Failed to save workout.");
      }

      const result = await response.json();
      console.log("Workout saved:", result);

      window.location.reload();
    } catch (error) {
      console.error("Error saving workout:", error);
    }
  };

  const handleDeleteWorkout = async () => {
    if (!workout || !workout.WorkoutID) {
      console.error("No workout selected to delete.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/deleteWorkout/${workout.WorkoutID}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Failed to delete workout.");
      }

      const result = await response.json();
      console.log("Workout deleted:", result);

      window.location.reload();
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  return (
    <div className="daycard-container">
      <div className="card-title">{chosenDay}</div>
      <form className="form-container" onSubmit={handleFormSubmit}>
        <div className="card-contents">
          <div className="dropdown-container">
            <div
              className="dropdown-header"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              {selectedMuscleGroups.length > 0
                ? selectedMuscleGroups.join(", ")
                : "Select Muscle Groups"}
              <span className="dropdown-arrow">{dropdownOpen ? "▲" : "▼"}</span>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                {muscleGroups.map((group, index) => (
                  <div
                    key={index}
                    className={`dropdown-item ${
                      selectedMuscleGroups.includes(group) ? "selected" : ""
                    }`}
                    onClick={() => handleMuscleGroupSelect(group)}
                  >
                    {group}
                  </div>
                ))}
              </div>
            )}
          </div>
          <textarea
            rows={4}
            placeholder="Notes"
            className="in-exercise"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="card-footer">
          <button
            className="cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedOption(0); // Switch back to Update component
            }}
          >
            Cancel
          </button>
          <button className="done-btn" type="submit">
            Save
          </button>
          {workout && (
            <button
              type="button"
              className="delete-btn"
              onClick={handleDeleteWorkout}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DayCard;
