import React, { useState } from "react";
import { RgbColorPicker } from "react-colorful";

export default function () {
  const [color, setColor] = useState({ r: 200, g: 150, b: 35});

  return (
    <div className="App">
      <RgbColorPicker color={color} onChange={setColor} />

      {/* <div className="value">{JSON.stringify(color)}</div> */}

      {/* <div className="buttons">
        <button onClick={() => setColor({ r: 75, g: 75, b: 150})}>
          Choose blue
        </button>
        <button onClick={() => setColor({ r: 50, g: 150, b: 50})}>
          Choose green
        </button>
      </div> */}
    </div>
  );
}
