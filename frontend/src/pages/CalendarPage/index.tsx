import Calendar from '../../components/Calendar/index.tsx';
import Update from '../../components/Update/index.tsx';
import DayCard from '../../components/DayCard/index.tsx';
import { CalendarProvider } from '../../components/Calendar/calendarContext.tsx';
import './styles.css';
import React, {createContext, useState, useContext} from "react";

interface DateContextType {
    selectedDate: Date | null;
    setSelectedDate: (date : Date) => void;
}



function CalendarPage() {

     const selectedOption = 1;

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
                <CalendarProvider>
                    <div className="calendar-container">
                            <Calendar/>
                    </div>
                    <div className="action-container">{content}</div>
                </CalendarProvider>
            </div>
        </>
    );
}

  export default CalendarPage;
  