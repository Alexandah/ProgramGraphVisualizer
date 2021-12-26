import * as React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthAPI from "src/api/auth";

interface NavBarWithUserProps {
    title: string;
    leftButtonIcon?: string;
    leftButtonText?: string;
    letfButtonRedirectPage?: string;
}

export default function NavigationBarWithUser(props: NavBarWithUserProps) {
    let history = useHistory();

    function signInButton() {
        if (!AuthAPI.isLoggedIn)
            return <div className="rButton" style={{ marginRight: "-1rem" }}>
                <button className="btn" onClick={() =>
                    history.push({ pathname: '/auth/login', state: { pathname: history.location.pathname } })}>
                    <span className="rText">Sign In</span>
                    <i className="fo icon-user-o fo-2x" />
                </button>
            </div >

        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        return <div className="rButton" style={{ marginRight: "-1rem" }}>
            <button className="btn btn-link" onClick={() => history.push('/auth/account')}>
                {vw > 380 && <span className="rText">{AuthAPI.user?.firstName}</span>}
                <i className="fo icon-user fo-2x" />
            </button>
        </div>
    }


    return (
        <nav className="nav navbar-expand-lg bg-faded flex-row navbar-light bg-light sl-navbar">
            <Link to={props.letfButtonRedirectPage}>
                <button className="btn btn-link lButton">
                    <i className={props.leftButtonIcon || "fo icon-left-open-big"} />
                    <span className="lText" >{props.leftButtonText || "Back"}</span>
                </button>
            </Link>

            <h2 className="mx-auto title">{props.title}</h2>

            {signInButton()}
        </nav>
    )
}

