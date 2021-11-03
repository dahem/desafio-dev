import React from "react";
import './style.css';

function FabButton(props) {
  return (
    <button className="fab-button" {...props}>
      {props.children}
    </button>
  );
}

export default FabButton;