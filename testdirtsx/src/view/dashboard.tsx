import * as React from "react";
import { Link } from "react-router-dom";
const logo = require("src/img/web_design.svg").default;


export default function Dashboard() {
    return (
        <div className="col text-center">
            <img className="img-fluid my-4" src={logo} style={{ height: "50vw", maxHeight: "500px" }} />
            <h2>Dashboard</h2>
            <p className="lead">Select what you like to work on from the side bar.</p>
            <hr />
            <p className="text-secondary">Corresponding view will be loaded in <strong> this area </strong> and you will be able to <strong>edit it</strong>.</p>
            <p className="lead mt-4">
                <Link className="text-white pw-no-decoration" to="/error/404">
                    <a className="sl-button-export">New invoice</a>
                </Link>
            </p>
        </div>
    )
}