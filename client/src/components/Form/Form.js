import React from "react";

export const Form = props =>
    <div className="row">
        <form className="col s12">
            <div className="row">
                <div className="input-field col s6" {...props} />
            </div>
        </form>
    </div>;