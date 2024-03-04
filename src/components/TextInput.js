import React from "react";
import "./TextInput.css";

function TextInput(props) {
  return (
    <div className="text-input-container">
      <input
        type="text"
        value={props.value}
        onFocus={props.handleFocus}
        onBlur={props.handleBlur}
        onChange={props.onChangeText}
        placeholder={props.placeholder}
        className={`text-input ${props?.showError}`}
      />
    </div>
  );
}

export default TextInput;
