import React from "react";

const infoCard = () =>

<div className="row">
    <form className="col s12">
        <div className="row">
            <div className="input-field col s6">
            <input placeholder="Username" id="first_name" type="text" className="validate"></input>
            <label for="username"></label>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12">
                <input id="password" type="password" placeholder="Password" className="validate"></input>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12">
                <input id="password" type="password" placeholder="Confirm Password" className="validate"></input>
            </div>
        </div>
        <div className="row">
            <div className="input-field col s12">
                <input id="email" type="email" placeholder="Email" className="validate"></input>
                <label for="email">Email</label>
            </div>
        </div>
        <div className="row">
            <div className="col s12">
            This is an inline input field:
                <div class="input-field inline">
                    <input id="email" type="email" placeholder="Confirm Email" className="validate"></input>
                    <label for="email" data-error="wrong" data-success="right"></label>
                </div>
            </div>
        </div>
    </form>
</div>

export default infoCard;


