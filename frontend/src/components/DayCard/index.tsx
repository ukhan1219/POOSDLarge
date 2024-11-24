import React, {createContext, useState, useContext, ReactNode} from "react";
import {useCalendar} from '../Calendar/calendarContext.tsx'
import EventForm from "./eventForm.tsx";
import './daycard.css'

const DayCard: React.FC = () =>  {

  const {selectedDate, events} = useCalendar();
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };

  const dayEvents = selectedDate
    ? events[selectedDate.toISOString().split('T')[0]] || []
    : [];

  return (
    < >
      <div className='daycard-container'>
        <div className='card-title'>
          <p> {selectedDate ? selectedDate.toDateString() : "No Date Selected"}</p>
        </div>
        <div className='card-contents'>
          {isEditing ? (
                      <EventForm /> // No need to pass selectedDate; it's available via context
                  ) : (
                      <>
                          <p>Events for the day:</p>
                          {dayEvents.length > 0 ? (
                              <ul>
                                  {dayEvents.map((event, index) => (
                                      <li key={index}>
                                          <strong>{event.title}</strong>
                                          <p>{event.exercises.join(', ')}</p>
                                          <p>Calories: {event.calorieCount}</p>
                                          <p>Time: {event.time}</p>
                                      </li>
                                  ))}
                              </ul>
                          ) : (
                              <p>No events logged for this day.</p>
                          )}
                      </>
                  )}
              </div>
              <div className="card-footer">
                  <button className="edit-btn" onClick={toggleEdit}>
                      {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button className="done-btn">Done</button>
              </div>
          </div>
        </>
      );
  };

export default DayCard