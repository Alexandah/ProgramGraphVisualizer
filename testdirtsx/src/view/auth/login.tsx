import * as React from "react";
import * as toastr from "toastr";
import NavigationBar from "src/part/navbar";
import Spinner from "src/part/spinner";
import { Link, useHistory, RouteComponentProps } from "react-router-dom";
import AuthAPI from "src/api/auth";
import UserModel from "src/model/user";
import DataLayer from "src/datalayer";

const logo = require("src/img/logo.png").default;


export default function PageLogin(props: RouteComponentProps) {
    const [auth, setAuth] = React.useState<UserModel>(new UserModel());
    const [isLoading, setIsLoading] = React.useState(false);
    let history = useHistory();

    React.useEffect(() => {
        document.title = "Login | SL";
    }, [])

    function clickSignIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // AP:Must for form submit. Otherwise strange urls hashes get appended automatically.
        if (isLoading)
            return;
        setIsLoading(true);

        const state = props.location.state as any;

        AuthAPI.login(auth)
            // .then(res => history.replace({ pathname: state?.pathname || '/', state: state }))
            .then(res => history.replace({ pathname: '/', state: state }))
            .catch(err => {
                DataLayer.handleError(err, false);
                toastr.error("Wrong User name or Password", "Login Failed");
                setIsLoading(false);
            })
    }

    return (
        <div>
            <NavigationBar
                leftButtonIcon=" "
                letfButtonRedirectPage=" "
                leftButtonText=" "
                title="Subledger Login" />
            <Spinner show={isLoading} marginTop='50%' />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-5 sl-login">
                        <form onSubmit={clickSignIn}>
                            <img className="img-fluid my-4" src={logo} style={{ minWidth: "18vmax", minHeight: "16vmax" }} />                            
                            <input type="email" name="email" autoComplete='username' placeholder="john@sedera.com" value={auth.email}
                                onChange={(e) => setAuth({ ...auth, email: e.target.value })} />
                            <input type="password" id="password" autoComplete='current-password' placeholder="Your subledger password" value={auth.password}
                                onChange={(e) => setAuth({ ...auth, password: e.target.value })} />
                            <div className="pwstrength_viewport_progress"></div>
                            <button type="submit" name="go" className="btn btn-lg btn-block sl-button py-3 mt-4">
                                Sign In
                            </button>
                            <div>
                                <Link to="/auth/register">Register</Link>
                                    &#09;| &#09;
                                <Link to="/auth/forgotPassword">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
