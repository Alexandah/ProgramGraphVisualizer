import * as React from "react";
import NavigationBar from "src/part/navbar";
import Spinner from "src/part/spinner";
import { useHistory, useParams } from "react-router-dom";
import AuthAPI from "src/api/auth";
import DataLayer from "src/datalayer";

export default function PagePasswordReset() {

    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [inputType, setInputType] = React.useState("password");

    // @ts-ignore
    let { code } = useParams();

    let history = useHistory();

    React.useEffect(() => { document.title = "Reset Password | SL" }, [])

    function clickSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoading)
            return;
        setIsLoading(true);

        AuthAPI.resetPassword(code,password)
            .then(() => history.push("/"))
            .catch(err => DataLayer.handleError(err, true))
            .finally(() => setIsLoading(false));

    }

    return (
        <div>
            <NavigationBar letfButtonRedirectPage="/auth/login" title="Password Reset" />
            <Spinner show={isLoading} marginTop='50%' />
            <div className="row justify-content-center">
                <div className="col-md-5 sl-login">
                    <form onSubmit={clickSubmit}>
                        <div className="row form-group">
                            <div className="col">
                        <div className="input-group">
                        <input type={inputType} name="password" placeholder="Enter a New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary btn-md" style={{ marginTop: "1rem" }} type="button" id="password"
                                        onClick={(e) => setInputType(e => e == "password" ? "text" : "password")}>
                                    <i className="fa fa-eye" />
                                </button>
                            </div>
                        </div>
                            </div>
                        </div>
                        <div className="row text-justify">
                            <ul>
                                <li>Password must be 8 characters long</li>
                                <li>Password must contain a upper case letter</li>
                                <li>Password must contain a lower case letter</li>
                                <li>Password must contain a number</li>
                            </ul>
                        </div>
                        <button type="submit" name="go" className="btn btn-lg sl-button py-3 btn-block mt-4">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}