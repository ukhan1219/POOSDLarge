import Calendar from "../Calendar";
import Blurb from "../Blurb";
import dumbbells from "../../assets/dumbbells.png";
import Update from "../Update";
import DayCard from "../DayCard";

import "./content.css";

function Content({ user }) {
  const selectedOption = 0;

  let content;
  switch (selectedOption) {
    case 0:
      content = <Update user={user} />;
      break;
    case 1:
      content = <DayCard />;
      break;
  }

  return (
    <div className="stuff">
      {user ? (
        <>
          <div className="calendar-container">
            <Calendar />
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
