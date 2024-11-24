import React, { useState } from 'react'
import {useCalendar} from './calendarContext.tsx'
import './calendar.css'

function Calendar() {

  const {selectedDate, setSelectedDate} = useCalendar();
  console.log({ selectedDate, setSelectedDate });
  const {events, setEvents} = useCalendar();

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  const handleDayClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    console.log("Selected date: ", new Date(currentYear, currentMonth, day))
  };

  return (
    <>
    <div className='calendar'>
      <p className='calendar-title'>
        <a className='left-arrow'>&lt;- </a>
        {currentDate.toLocaleString('default', { month: 'long' })} {currentYear}
        <a className='right-arrow'> -&gt;</a>
      </p>
      <div className='calendar-grid'>
        {daysOfWeek.map((day) => (
          <div key={day} className='day-of-week'>
            {day}
          </div>
        ))}
        {Array.from({ length: daysInMonth }, (_, index) =>{
          const day = index + 1
          const dateKey = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
          const hasEvents = events[dateKey] && events[dateKey].length > 0;
          
          return (
            <div
              key={day}
              className={`calendar-cell ${hasEvents ? 'has-event' : ''}
                ${selectedDate?.getDate() === day ? "selected" : ""
              }`}
              onClick={() => handleDayClick(day)}
            >
              <span>{day}</span>
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
}

export default Calendar