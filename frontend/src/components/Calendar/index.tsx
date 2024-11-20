import React, { useState } from 'react'

import './calendar.css'

function Calendar() {

  const[selectedDate, setSelectedDate] = useState(null)
  const[events, setEvent] = useState({})

  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat']

  const handleDayClick = (day) => {
    selectedDate(day)
  }

  return (
    < >
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
          return (
            <div
              key={day}
              className='calendar-cell'
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default Calendar