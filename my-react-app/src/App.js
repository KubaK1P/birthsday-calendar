import './App.css';
import { useState } from 'react';

function App() {
  const year = 2025;
  const month = 3;
  const birthsDay = 26;
  const birthsDate = new Date(year, month, birthsDay);
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // const monthName = birthsDate.toLocaleString('default', { month: 'long' });
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const [checkedDays, setCheckedDays] = useState(() => {
  // Load from localStorage when the component mounts
  const stored = localStorage.getItem('checkedDays');
  return stored ? JSON.parse(stored) : [];
});
const handleCheckIn = (day) => {
  if (!checkedDays.includes(day)) {
    const updated = [...checkedDays, day];
    setCheckedDays(updated);
    localStorage.setItem('checkedDays', JSON.stringify(updated));
  }
};

const calendarCells = [];

for (let i = 0; i < startDay; i++) {
  calendarCells.push(<div key={`empty-${i}`} className="day empty"></div>);
}

for (let day = 1; day <= daysInMonth; day++) {
  const isBirthsDay = day === birthsDay;
  const isToday = day === currentDay;
  const isBetween = day > currentDay && day < birthsDay;
  const isChecked = checkedDays.includes(day);

  calendarCells.push(
    <div
      key={`day-${day}`}
      className={`day ${isBirthsDay ? "birthsday" : ""} ${isToday ? "current" : ""} ${isBetween ? "remaining" : ""} ${isChecked ? "checked" : ""}`}
      onClick={() => isToday && handleCheckIn(day)}
    >
      <span>{day}</span>
    </div>
  );
}


  return (
    <div className="container">
      <header className="app-header">
        <h1>Birthsday calendar: {birthsDate.toLocaleDateString("en-EN", options)}</h1>
        <h2><span className="red">{birthsDay - currentDay}</span> days remaining</h2>
      </header>
      <main className="app-main">
        <div className="calendar">
          {(dayNames.map((day) => {
            return <div key={day} className="day-label">{day}</div>
          }))}
          {calendarCells}
        </div>
      </main>
    
    </div>
  );
}

export default App;
