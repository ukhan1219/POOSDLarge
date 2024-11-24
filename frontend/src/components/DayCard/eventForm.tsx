import React, {useState} from "react";
import { useCalendar } from "../Calendar/calendarContext";

const EventForm: React.FC = () =>  {

    const {selectedDate, addEvent} = useCalendar();
    const [title, setTitle] = useState('');
    const [exercises, setExercises] = useState('');
    const [calories, setCalories] = useState<number>(0);
    const [time, setTime] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if(selectedDate && title && exercises && calories && time)
        {
            const newEvent = {
                title,
                exercises: exercises.split(',').map((exercise) => exercise.trim()),
                calorieCount: calories,
                time,
            };

            addEvent(selectedDate, newEvent);
            setTitle('');
            setTitle(''); // Reset form fields
            setExercises('');
            setCalories(0);
            setTime('');
        }
        else
        {
            alert("please fill in all form fields");
        }
    };

    return(
        <form onSubmit = {handleSubmit} className = "event-form">
            <h3>Create New Event</h3>
            <div>
                <label>Event Title</label>
                <input 
                    type = "text"
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                    required
                    />
            </div>
            <div>
                <label>Exercises (comma separated)</label>
                <input
                    type="text"
                    value={exercises}
                    onChange={(e) => setExercises(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Calories Burned</label>
                <input
                    type="number"
                    value={calories}
                    onChange={(e) => setCalories(Number(e.target.value))}
                    required
                />
            </div>
            <div>
                <label>Time (HH:MM)</label>
                <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;