import Calendar from "../Calendar";
import Blurb from "../Blurb";
import dumbbells from "../../assets/dumbbells.png";
import Update from "../Update";
import DayCard from "../DayCard";

import "./content.css";

interface ContentProps {
  status: boolean;
}

const Content: React.FC<ContentProps> = ({ status }) => {
  console.log("content status:", status);

  const selectedOption = 0;

  let content;
  switch (selectedOption) {
    case 0:
      content = <Update />;
      break;
    case 1:
      content = <DayCard />;
      break;
  }

  return (
    <div className="stuff">
        <Blurb status = {status}/>
        <img src={dumbbells} className="dumbbells"></img>
    </div>
  );
}

export default Content;
