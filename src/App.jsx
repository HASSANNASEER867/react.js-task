import React, { useState } from 'react';
import './App.css';

function App() {
  const [boxes, setBoxes] = useState([]);
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');

  const addBox = () => {
    const newBox = {
      id: Date.now(),
      text: text,
      bgColor: bgColor,
      textColor: textColor,
      timer: 30,
    };
    setBoxes([...boxes, newBox]);
    setText('');
    setBgColor('#ffffff');
    setTextColor('#000000');
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setBoxes((prevBoxes) =>
        prevBoxes
          .map((box) => ({
            ...box,
            timer: box.timer > 0 ? box.timer - 1 : 0,
          }))
          .filter((box) => box.timer > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        <input
          type="text"
          placeholder="Enter text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="color"
          value={bgColor}
          onChange={(e) => setBgColor(e.target.value)}
        />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
        <button onClick={addBox}>Add</button>
      </nav>
      <div className="box-container">
        {boxes.map((box) => (
          <div
            key={box.id}
            className="box"
            style={{ backgroundColor: box.bgColor, color: box.textColor }}
          >
            <p>{box.text}</p>
            <span className="timer">{box.timer}s</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
