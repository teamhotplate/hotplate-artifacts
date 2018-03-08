import React from "react";

export const Input = props =>
    <div className="row">
        <div className="input-field col s6">
            <input className="validate" {...props}></input>
        </div>
    </div>