import React from "react";
import street from "../Images/street.png";
import map from "../Images/map.png";
import satellite from "../Images/satellite.png";
import "../Layers/LayerComponent.css";

interface LayerComponentProps {
  onChange: (style: string) => void;
  currentStyle: string;
}


const LayerComponent: React.FC<LayerComponentProps> = ({
  
  onChange,
  currentStyle,
}) => {
  return (
    <div>
      <img
        className={`image ${
          currentStyle ===
          `${process.env.REACT_APP_MAPTILER_API_KEY}`
            ? "active"
            : ""
        }`}
        src={map}
        alt="Basic View"
        onClick={() =>
          onChange(
            `${process.env.REACT_APP_MAPTILER_API_KEY}`
            )
        }
      />
      <img
        className={`image ${
          currentStyle ===`${process.env.REACT_APP_MAPTILER_LAYER_STREETS}`
            ? "active"
            : ""
        }`}
        src={street}
        alt="Streets View"
        onClick={() =>
          onChange(
            `${process.env.REACT_APP_MAPTILER_LAYER_STREETS}`
            )
        }
      />
      <img
        className={`image ${
          currentStyle ===
          `${process.env.REACT_APP_MAPTILER_LAYER_SATELLITE}`
            ? "active"
            : ""
        }`}
        src={satellite}
        alt="Satellite View"
        onClick={() =>
          onChange(
            `${process.env.REACT_APP_MAPTILER_LAYER_SATELLITE}`
            )
        }
      />
    </div>
    
  );
};

export default LayerComponent;
