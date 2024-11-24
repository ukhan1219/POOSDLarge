import Calendar from "../Calendar";
import Blurb from "../Blurb";
import dumbbells from "../../assets/dumbbells.png";
import Update from "../Update";
import DayCard from "../DayCard";
import { useState } from "react"

import "./content.css";

function Content({ user }) {
  const [selectedOption, setSelectedOption] = useState(0);

  const [cardState, setCardState] = useState(0)

  function handleCardState(state) {
    setCardState(state)
  }

  function handleSelection(day) {
    setSelectedOption(day)
  }

  const [selectedDay, setSelectedDay] = useState(null)

  function handleSelectDay(day) {
    console.log(day)
    setSelectedDay(day)
  }

  let content;
  switch (selectedOption) {
    case 0:
      content = <Update user={user} />;
      break;
    default:
      content = <DayCard chosenDay={selectedDay} option={handleSelection} stateSelect={handleCardState} state={cardState}/>;
      break;
  }

  return (
    <div className="stuff">
      {user ? (
        <>
          <div className="calendar-container">
            <Calendar choose={handleSelectDay} select={handleSelection} state={handleCardState}/>
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
