import Calendar from '../../components/Calendar/index.tsx';
import Update from '../../components/Update/index.tsx';
import DayCard from '../../components/Update/index.tsx';

import './styles.css';

function CalendarPage() {

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
        return(
        <>
            <div className = "stuff">
                <div className="calendar-container">
                    <Calendar />
                </div>
                <div className="action-container">{content}</div>
            </div>
        </>
    );
}

  export default CalendarPage;
  