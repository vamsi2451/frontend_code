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
  const handleStyleChange = (newStyle: string, viewName: string) => {
    console.log(`Changing style to ${viewName}:`, newStyle);
    onChange(newStyle);
  };

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
          handleStyleChange(
            `${process.env.REACT_APP_MAPTILER_API_KEY}`,
            "Basic View"
          )
        }
      />
      <img
        className={`image ${
          currentStyle === `${process.env.REACT_APP_MAPTILER_LAYER_STREETS}`
            ? "active"
            : ""
        }`}
        src={street}
        alt="Streets View"
        onClick={() =>
          handleStyleChange(
            `${process.env.REACT_APP_MAPTILER_LAYER_STREETS}`,
            "Streets View"
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
          handleStyleChange(
            `${process.env.REACT_APP_MAPTILER_LAYER_SATELLITE}`,
            "Satellite View"
          )
        }
      />
    </div>
  );
};

export default LayerComponent;
