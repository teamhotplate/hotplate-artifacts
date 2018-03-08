import React from "react";

export const Button = props =>

    <button {...props} className="btn waves-effect waves-light" type="submit" name="action">
        {props.children}
        <i className="material-icons right"></i>
    </button>;