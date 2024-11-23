import "./update.css";

function Update({ user }) {
  const User = user?.name || "Guest";
  const Exercised = 0;
  const toExercise = 0;
  //TODO ADD REAL EXCERSIE DATA
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
