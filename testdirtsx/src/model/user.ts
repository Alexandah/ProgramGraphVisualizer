//--------------------------------------------------------------------------------------------------------------
// User object allways exists. NULL role is used to detect logged in status for now.
export default class UserModel {
    id: string;
    email: string = "";
    password: string = "";
    imageUrl: string;
    userName: string;
    lastName: string;
    firstName: string;
    token: string = null;
    tokenExpire: string;
    tokenExpireUnix: number;


    static removeEmpty(obj: any) {
        Object.entries(obj).forEach(([key, val]) => {
            if (val && typeof val === 'object') this.removeEmpty(val)
            else if (val == null) delete obj[key]
        })
    }
}