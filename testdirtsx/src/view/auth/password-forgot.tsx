import * as React from "react";
import NavigationBar from "src/part/navbar";
import Spinner from "src/part/spinner";
import { useHistory } from "react-router-dom";
import AuthAPI from "src/api/auth";
import DataLayer from "src/datalayer";

export default function PagePasswordForgot() {
    const [email, setEmail] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    let history = useHistory();

    React.useEffect(() => { document.title = "Forgot Password | SL" }, [])

    function clickSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoading)
            return;
        setIsLoading(true);
        AuthAPI.forgotPassword(email)
            .then(() => history.push("/"))
            .catch(err => { setIsLoading(false); DataLayer.handleError(err, true); });
    }

    return (
        <div>
            <NavigationBar letfButtonRedirectPage="/auth/login" title="Forgot Password" />
            <Spinner show={isLoading} marginTop='50%' />
            <div className="row justify-content-center">
                <div className="col-md-5 sl-login">
                    <form onSubmit={clickSubmit}>
                        <i className="fo icon-lock-1 my-3 rr-color-black" style={{ fontSize: '6rem' }} />
                        <input type="email" name="email" placeholder="Your subledger user name" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <div className="pwstrength_viewport_progress"></div>
                        <button type="submit" name="go" className="btn btn-lg sl-button py-3 btn-block mt-4">
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}