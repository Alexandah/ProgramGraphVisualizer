import * as React from "react";
import NavigationBar from "src/part/navbar";
import Spinner from "src/part/spinner";
import AuthAPI from "src/api/auth";
import UserModel from "src/model/user";
import { useHistory, useLocation } from "react-router-dom";
import DataLayer from "src/datalayer";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function PageRegister() {
    const [userModel, setUserModel] = React.useState<UserModel>(new UserModel());
    const [isLoading, setIsLoading] = React.useState(false);
    const [inputType, setInputType] = React.useState("password");
    const [code, setCode] = React.useState<string>();


    let email: string = null;
    let name: string = null;
    let history = useHistory();
    const query = useQuery();

    React.useEffect(() => {
        document.title = "Register | SL";

        email = query.get("email");
        name = query.get("name");
        if (email && name) {
            setUserModel({ ...userModel, email: email, firstName: name });
            setCode(query.get("code"));
        }

    }, [])

    function clickRegister(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (isLoading)
            return;
        setIsLoading(true);

        AuthAPI.register(userModel, code)
            .then((slug) => history.push("/"))
            .catch(err => DataLayer.handleError(err, true))
            .finally(() => setIsLoading(false));
    }

    return (
        <div>
            <NavigationBar letfButtonRedirectPage="/auth/login" title="New User Registration" />
            <Spinner show={isLoading} marginTop='50%' />
            <div className="row justify-content-center">
                <div className="col-md-5 sl-login">
                    <form onSubmit={clickRegister}>
                        <i className="fo icon-user-plus my-3 rr-color-black" style={{ fontSize: '5rem' }} />
                        <input type="text" name="name" placeholder="Enter your name" autoComplete="off" disabled={!!code}
                            value={userModel.firstName} onChange={(e) => setUserModel({ ...userModel, firstName: e.target.value })} />
                        <input type="email" name="email" placeholder="email" disabled={!!code}
                            value={userModel.email} onChange={(e) => setUserModel({ ...userModel, email: e.target.value })} />

                        <div className="input-group">
                            <input type={inputType} id="password" placeholder="Password"
                                value={userModel.password} onChange={(e) => setUserModel({ ...userModel, password: e.target.value })} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary btn-lg" style={{ marginTop: "1rem" }} type="button" id="password"
                                    onClick={e => setInputType(cv => cv == "password" ? "text" : "password")}>
                                    <i className="fo icon-info" />
                                </button>
                            </div>
                        </div>

                        <div className="pwstrength_viewport_progress" />
                        <button type="submit" name="go" className="btn btn-lg btn-primary btn-block py-3 sl-button mt-4">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}