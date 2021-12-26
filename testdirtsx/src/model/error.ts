export default class ErrorModel {
    message: string;
    title: string;
    code: number;

    constructor(responseError: any, defaultMessage: string = null) {
        this.code = responseError.status;

        try {
            this.message = responseError.response.body.description;
            this.title = responseError.response.body.title;
            console.error(JSON.stringify(responseError.response.body));
        }
        catch {
            console.error(responseError);
            this.message = responseError.message || defaultMessage;
            this.title = "ERROR";
        }
    }
}