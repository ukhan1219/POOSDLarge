import "./update.css";

function Update() {
  const User = "John";
  const Exercised = 0;
  const toExercise = 0;

  return (
    <>
      <div className="update-container">
        <p>Welcome back {User}!</p>
        <p>You have worked out {Exercised} days this month.</p>
        <p>You have {toExercise} more workouts planned this month.</p>
      </div>
    </>
  );
}

export default Update;
