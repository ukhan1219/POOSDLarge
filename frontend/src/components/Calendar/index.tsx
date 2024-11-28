import React, { useState, useEffect } from "react";
import "./calendar.css";

function Calendar({ choose, state, select, userId, option }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [workoutDays, setWorkoutDays] = useState([]);

  useEffect(() => {
    const fetchWorkoutDays = async () => {
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:3000/api/getAllWorkouts/${userId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const workouts = await response.json();
        const workoutDates = workouts.map((workout) =>
          new Date(workout.Date).toDateString(),
        );
        setWorkoutDays(workoutDates);
      } catch (error) {
        console.error("Error fetching workout days:", error);
      }
    };

    fetchWorkoutDays();
  }, [userId]);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDayClick = async (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    setSelectedDate(selected);

    try {
      const response = await fetch(
        `http://localhost:3000/api/getWorkoutForDate/${userId}/${selected.toISOString()}`,
      );
      if (!response.ok) {
        throw new Error("No workout found for this date.");
      }
      const workout = await response.json();
      console.log("Fetched workout:", workout);
      choose(selected.toDateString(), workout);
    } catch (error) {
      console.log("No workout for this date, creating a new one.");
      choose(selected.toDateString(), null);
    }

    state(0);
    select(day);
  };

  const handlePrevMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 0) {
        setCurrentYear((prevYear) => prevYear - 1);
        return 11;
      } else {
        return prevMonth - 1;
      }
    });
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => {
      if (prevMonth === 11) {
        setCurrentYear((prevYear) => prevYear + 1);
        return 0;
      } else {
        return prevMonth + 1;
      }
    });
  };

  const dayCells = () => {
    const totalCells = 42;
    const cells = [];

    const today = new Date();

    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push(
        <div key={"empty-" + i} className="calendar-cell empty"></div>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(
        currentYear,
        currentMonth,
        day,
      ).toDateString();

      const isToday =
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear();

      const isSelected =
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear;

      const hasWorkout = workoutDays.includes(currentDate);

      cells.push(
        <div
          key={day}
          className={`calendar-cell ${isToday ? "today" : ""} ${
            (isSelected && (option != 0)) ? "selected" : ""
          }`}
          onClick={() => handleDayClick(day)}
        >
          <span className="day-number">{day}</span>
          {hasWorkout && <span className="workout-icon">🏋️</span>}
        </div>,
      );
    }

    const remainingCells = totalCells - cells.length;
    for (let i = 0; i < remainingCells; i++) {
      cells.push(
        <div key={"empty-end-" + i} className="calendar-cell empty"></div>,
      );
    }

    return cells;
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="left-arrow" onClick={handlePrevMonth}>
          &lt;-
        </button>
        <span className="calendar-title">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button className="right-arrow" onClick={handleNextMonth}>
          -&gt;
        </button>
      </div>
      <div className="calendar-grid">
        {daysOfWeek.map((day) => (
          <div key={day} className='day-of-week' >
            {day}
          </div>
        ))}
        {dayCells()}
      </div>
    </div>
  );
}

export default Calendar;
