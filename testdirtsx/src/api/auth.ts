import * as request from "superagent";
import * as toastr from "toastr";
import { API_BASE_URL } from "src/env";
import UserModel from "src/model/user";

export default class AuthAPI {
    private static _user: UserModel;

    //-------------------------------------------------------------------------------------------------------
    static login(user: UserModel): Promise<void> {
        return request
            .put(API_BASE_URL + '/v1/auth')
            .set({ 'Content-Type': 'application/json' })
            .send(user)
            .then(res => {
                localStorage.setItem('user_email', user.email);
                this.user = res.body as UserModel;
            })
    }

    //-------------------------------------------------------------------------------------------------------
    static logout(): Promise<void> {
        return request
            .delete(API_BASE_URL + '/v1/auth')
            .set(AuthAPI.authHeaders)
            .then(r => { })
            .finally(() => {
                delete localStorage.user;
                this._user = new UserModel();
            })
    }

    //-------------------------------------------------------------------------------------------------------
    static forgotPassword(email: string): Promise<void> {
        return request
            .post(API_BASE_URL + '/v1/auth/forgotPassword')
            .set({ 'Content-Type': 'application/json', 'credentials': 'same-origin' })
            .send({ "email": email })
            .then(() => { toastr.success("We just sent you password reset link.", "Please check your email.") });
    }

    //-------------------------------------------------------------------------------------------------------
    static resetPassword(code: string, password: string): Promise<void> {
        return request
            .post(`${API_BASE_URL}/v1/auth/resetPassword/${code}`)
            .set({ 'Content-Type': 'application/json', 'credentials': 'same-origin' })
            .send({ "password": password })
            .then(res => {
                this.user = res.body;
                toastr.success("Password successfully reset");
            });
    }

    //-------------------------------------------------------------------------------------------------------
    static register(user: UserModel, code: string = null): Promise<UserModel> {
        return request
            .post(API_BASE_URL + '/v1/auth')
            .set({ 'Content-Type': 'application/json', 'accept': '*/*' })
            .send({ ...user, code: code })
            .then(res => {
                this.user = res.body;
                localStorage.setItem('user_email', user.email);
                toastr.success('Account has been created');
                return this.user;
            })
    }


    //-------------------------------------------------------------------------------------------------------
    // USER API and MANAGE
    //-------------------------------------------------------------------------------------------------------
    /**
     * Get user profile from API based on current token
     * @returns  user model.
     */
    static userRead(): Promise<UserModel> {
        return request
            .get(API_BASE_URL + 'v1/users/current')
            .set(AuthAPI.authHeaders)
            .then(res => {
                this.user = res.body;
                localStorage.setItem('user_email', this._user.email);
                return this._user;
            })
    }
    //-------------------------------------------------------------------------------------------------------
    static userPasswordUpdate(new_password: string, old_password: string): Promise<void> {
        return request
            .put(API_BASE_URL + '/v1/users/current/password')
            .set(AuthAPI.authHeaders)
            .send({ "old_password": old_password, "new_password": new_password })
            .then(res => this.user = res.body)
    }

    //-------------------------------------------------------------------------------------------------------
    static userUpdate(user: UserModel): Promise<UserModel> {
        return request
            .patch(API_BASE_URL + 'v1/users/current')
            .set(AuthAPI.authHeaders)
            .send(user)
            .then(res => {
                this.user = res.body;
                return this._user;
            })
    }
    //-------------------------------------------------------------------------------------------------------
    // Static access to browser stored values
    //-------------------------------------------------------------------------------------------------------
    static get user(): UserModel {
        if (!this._user) {
            this._user = localStorage.getJson('user') as UserModel;
            if (!this._user)
                this._user = new UserModel();
        }
        return this._user;
    }

    //-------------------------------------------------------------------------------------------------------
    static set user(value: UserModel) {
        this._user = value;
        localStorage.setItem('user', JSON.stringify(value));
    }

    //-------------------------------------------------------------------------------------------------------
    static get isLoggedIn(): boolean {
        const currentTime = Math.round((new Date()).getTime() / 1000);
        return this.user.token != null && this.user.tokenExpireUnix > currentTime;
    }

    //-------------------------------------------------------------------------------------------------------
    static get authHeaders(): {} {
        return {
            'Content-Type': 'application/json',
            'credentials': 'same-origin',
            'Authorization': this.user.token
        }
    }
    //-------------------------------------------------------------------------------------------------------
    static get authHeadersNoContentType(): {} {
        return {
            'credentials': 'same-origin',
            'Authorization': this.user.token
        }
    }
}