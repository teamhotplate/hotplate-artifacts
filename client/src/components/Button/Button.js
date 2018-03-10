import React from "react";

export const Button = props =>

    <button {...props}>
        {props.children}
        <i className="material-icons right"></i>
    </button>;