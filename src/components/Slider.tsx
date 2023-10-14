import React from "react";
import { Range } from "react-range";
import { SliderProps } from "../types";

const Slider: React.FC<SliderProps> = ({ min, max, values, onChange }) => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Range
        step={1}
        min={min}
        max={max}
        values={values}
        onChange={onChange}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#d9d9d9",
              borderRadius: "3px",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "20px",
              width: "20px",
              backgroundColor: "#fff",
              border: "1px solid #d9d9d9",
              borderRadius: "50%",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}
      />
      <div style={{ marginTop: "16px", fontSize: "16px", fontWeight: "500" }}>
        Age Range: {values[0]} - {values[1]}
      </div>
    </div>
  );
};

export default Slider;
