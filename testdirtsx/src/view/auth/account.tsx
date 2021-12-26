import * as React from "react";
import * as toastr from "toastr";
import { useHistory } from "react-router-dom";
import UserModel from "src/model/user";
import NavigationBar from "src/part/navbar";
import AuthAPI from "src/api/auth";
import Spinner from "src/part/spinner";
import DataLayer from "src/datalayer";


export default function PageAccount() {
    let history = useHistory();
    const [isLoading, setIsLoading] = React.useState(false);
    const [user, setUser] = React.useState<UserModel>(AuthAPI.user);
    const [newPassword, setNewPassword] = React.useState("");
    const [oldPassword, setOldPassword] = React.useState("");
    const [inputOldPassword, setInputOldPassword] = React.useState("password");
    const [inputNewPassword, setInputNewPassword] = React.useState("password");

    React.useEffect(() => {
        document.title = "Account | SL";
        setUser(AuthAPI.user);
    }, [])

    function save() {
        event.preventDefault();

    }

    function passwordUpdate() {
        event.preventDefault();
        setIsLoading(true);
        AuthAPI
            .userPasswordUpdate(newPassword, oldPassword)
            .then(() => toastr.success("Password Updated", "Success"))
            .catch(err => DataLayer.handleError(err, true))
            .finally(() => setIsLoading(false));
    }

    function rightNavBarAction() {
        event.preventDefault();
        setIsLoading(true);
        AuthAPI
            .logout()
            .then(() => { })
            .finally(() => history.push('/auth/login'));
    }


    return <>
        <NavigationBar
            title="My Account"
            rightButtonIcon="fo icon-off"
            rightButtonText="Sign Out"
            rightButtonCommand={rightNavBarAction}
        />
        <Spinner show={isLoading} marginTop='40%' />
        <div className="sl-account">
            <div className="card">
                <div className="card-block">
                    <h4 className="text-secondary card-title fo icon-user card-heading">General</h4>
                    <div className="card-body">
                        <div className="row form-group">
                            <div className="col">
                                <label className="control-label">First Name</label>
                                <input type="text" name="first_name" className="form-control" value={user.firstName}
                                    onBlur={save}
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })} />
                            </div>
                            <div className="col">
                                <label className="control-label">Last Name</label>
                                <input type="text" name="last_name" className="form-control" value={user.lastName}
                                    onBlur={save}
                                    onChange={(e) => setUser({ ...user, lastName: e.target.value })} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-block">
                    <h4 className="text-secondary card-title fo icon-lock card-heading">Security</h4>
                    <div className="card-body">
                        <div className="form-group">
                            <label className="control-label">Account</label>
                            <input type="text" disabled={true} className="form-control" value={user.userName} />
                        </div>
                        <div className="row form-group">
                            <div className="col">
                                <label className="control-label">Password</label>
                                <div className="input-group">
                                <input type={inputOldPassword} disabled={false} autoComplete='current-password' name="password"
                                    placeholder="Enter Current Password" className="form-control" value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)} />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary btn-md" type="button" id="password"
                                                onClick={(e) => setInputOldPassword(e => e == "password" ? "text" : "password")}>
                                            <i className="fa fa-eye" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <label className="control-label">New Password</label>
                                <div className="input-group">
                                    <input type={inputNewPassword} disabled={false} autoComplete='new-password'
                                           name="password"
                                           placeholder="Enter New Password"
                                           className="form-control" value={newPassword}
                                           onChange={(e) => setNewPassword(e.target.value)}/>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary btn-md" type="button" id="password"
                                                onClick={(e) => setInputNewPassword(e => e == "password" ? "text" : "password")}>
                                            <i className="fa fa-eye"/>
                                        </button>
                                    </div>
                                </div>
                                <br/>
                                <div className="row text-justify">
                                    <ul>
                                        <li>Password must be 8 characters long</li>
                                        <li>Password must contain a upper case letter</li>
                                        <li>Password must contain a lower case letter</li>
                                        <li>Password must contain a number</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div>
                            <button type="button" onClick={passwordUpdate}
                                className="btn btn-lg btn-success btn-block">
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br />
    </>
}

