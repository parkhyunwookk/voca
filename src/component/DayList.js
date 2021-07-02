import React from "react";
import dummy from "../db/data.json";

function DayList() {
  console.log(dummy);
  return (
    <div>
      <ul className="list_day">
        {dummy.days.map((day) => (
          <li key={day.id}>Day {day.day}</li>
        ))}
      </ul>
    </div>
  );
}

export default DayList;
