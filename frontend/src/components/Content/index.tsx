import Calendar from "../Calendar";
import Blurb from "../Blurb";
import dumbbells from "../../assets/dumbbells.png";
import Update from "../Update";
import DayCard from "../DayCard";
import { useState } from "react";
import "./content.css";

function Content({ user }) {
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleSelection = (day, workout) => {
    setSelectedDay(day);
    setSelectedWorkout(workout);
    setSelectedOption(1);
  };

  let content;
  switch (selectedOption) {
    case 0:
      content = <Update user={user} />;
      break;
    case 1:
      content = (
        <DayCard
          chosenDay={selectedDay}
          workout={selectedWorkout}
          setSelectedOption={setSelectedOption}
        />
      );
      break;
    default:
      content = <Update user={user} />;
      break;
  }

  return (
    <div className="stuff">
      {user ? (
        <>
          <div className="calendar-container">
            <Calendar choose={handleSelection} userId={user.id} />
          </div>
          <div className="action-container">{content}</div>
        </>
      ) : (
        <>
          <Blurb />
          <img src={dumbbells} className="dumbbells" />
        </>
      )}
    </div>
  );
}

export default Content;
