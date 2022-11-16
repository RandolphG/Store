import React, { useState } from "react";
import "./ThumbSliderStyles.scss";

const ThumbSlider = () => {
  const [lowValue, setLowValue] = useState(0);
  const [highValue, setHighValue] = useState(50);

  const handleSetNodeProperty = (event: any) => {
    event.preventDefault();
    const { value, name } = event.target;
    switch (name) {
      case "lowValue":
        if (value < highValue) {
          setLowValue(value);
        }
        break;
      case "highValue":
        if (value > lowValue) {
          setHighValue(value);
        }
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <div
        className="wrap"
        role="group"
        aria-labelledby="multi-lbl"
        style={
          {
            "--a": lowValue,
            "--b": highValue,
            "--min": 0,
            "--max": 50,
          } as React.CSSProperties
        }
      >
        <div
          style={{
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-between",
            width: "20em",
            padding: "0 1em 0 1em",
            background: "fuchsia",
          }}
        >
          <span
            style={{
              color: "white",
              display: "flex",
              boxSizing: "border-box",
            }}
          >
            <p
              style={{
                color: "black",
                fontStyle: "oblique",
                fontWeight: "bolder",
                boxSizing: "border-box",
                marginRight: "1em",
              }}
            >
              LOW
            </p>
            <p>{lowValue}</p>
          </span>
          <span
            style={{ color: "white", display: "flex", boxSizing: "border-box" }}
          >
            <p
              style={{
                color: "black",
                fontStyle: "oblique",
                fontWeight: "bolder",
                boxSizing: "border-box",
                marginRight: "1em",
              }}
            >
              HIGH
            </p>{" "}
            <p>{highValue}</p>
          </span>
        </div>

        <input
          name="lowValue"
          onChange={handleSetNodeProperty}
          id="a"
          type="range"
          min="0"
          value={lowValue}
          max="50"
        />
        {/*        <output
          htmlFor="a"
          style={{ "--c": "var(--a)" } as React.CSSProperties}
        />*/}
        <input
          name="highValue"
          onChange={handleSetNodeProperty}
          id="high"
          type="range"
          min="0"
          value={highValue}
          max="50"
        />

        {/*
        <output
          htmlFor="high"
          style={{ "--c": "var(--b)" } as React.CSSProperties}
        />*/}
      </div>
    </div>
  );
};

export default ThumbSlider;
