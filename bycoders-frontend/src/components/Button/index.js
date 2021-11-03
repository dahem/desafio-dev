import React from "react";
import './style.css';
import { FaSpinner } from 'react-icons/fa';

function Button(props) {
  return (
    <button className="button" {...props} onClick={props.onClick}>
      {props.loading ? <FaSpinner className="icon" /> : props.label}
    </button>
  );
}
export default Button;