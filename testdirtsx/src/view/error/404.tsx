import * as React from "react";
import { Link } from "react-router-dom";

const logo = require("src/img/error_404.svg").default;

export default function PageError_404() {

    return <div>
        <div className="container sl-status">
            <img src={logo} />
            <h1>page not found</h1>
            <p className="lead">Some of our pages, such as password restore or email confirmation, only have short lifespan. Please return to the Home page.</p>
            <Link to="/">
                <button type="button" className="btn btn-outline-secondary btn-lg ml-2">
                    Home
                </button>
            </Link>
        </div>
    </div>
}