import Calendar from '../../components/Calendar/index.tsx';
import Update from '../../components/Update/index.tsx';
import DayCard from '../../components/DayCard/index.tsx';

import './calendar.css';
import React, {createContext, useState, useContext, ReactNode} from "react";

interface Event {
    title: string;
    exercises: string[];
    time: string;
    calorieCount: number;
}

interface CalendarContext {
    selectedDate: Date | null;
    setSelectedDate: (date : Date) => void;
    events: Record<string, Event[]>;
    addEvent: (date: Date, event: Event) => void;
}

const CalendarContext = createContext<CalendarContext | undefined>(undefined);

export {CalendarContext};

export const CalendarProvider: React.FC<{children : ReactNode}> = ({children}) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [events, setEvents] = useState<Record<string,Event[]>>({});
    
    const addEvent = (date: Date, event: Event) => {
        const dateKey = date.toISOString().split("T")[0];
        setEvents((prevEvents) =>({
            ...prevEvents,
            [dateKey]: [...(prevEvents[dateKey] || []), event],
        }));
    };
    

    return (
        <CalendarContext.Provider value = {{selectedDate, setSelectedDate, events, addEvent}}>
            {children}
        </CalendarContext.Provider>
    );
};

export const useCalendar = () => {
    const context = useContext(CalendarContext);
    if(!context)
    {
        throw new Error("useDate must be used with a CalendarProvider")
    }
    return context;
};