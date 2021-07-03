import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import useFetch from "../hooks/useFetch";

function CreateWord() {
  const days = useFetch("http://localhost:3001/days");
  const [isLoding, setIsLoding] = useState(false);
  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);
  const history = useHistory();

  function onSubmit(e) {
    e.preventDefault();
    if (!isLoding) {
      setIsLoding(true);
      fetch(`http://localhost:3001/words/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          day: dayRef.current.value,
          eng: engRef.current.value,
          kor: korRef.current.value,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료되었습니다.");
          setIsLoding(false);
          history.push(`/day/${dayRef.current.value}`);
        }
      });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="ex)computer" ref={engRef}></input>
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="ex)컴퓨터" ref={korRef}></input>
      </div>
      <div className="input_area">
        <label>Day</label>
        <select ref={dayRef}>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button style={{ opacity: isLoding ? 0.3 : 1 }}>{isLoding ? "Saveing..." : "저장"}</button>
    </form>
  );
}

export default CreateWord;
