import * as request from "superagent";
import { API_BASE_URL } from "src/env";
import AuthAPI from "./auth";


export default class EmployerAPI {
    static qbSyncCustomersToEmployers(): Promise<{ qb1: number, qb2: number }> {
        return request
            .post(`${API_BASE_URL}/v1/quickbooks/employers/sync`)
            .set(AuthAPI.authHeaders)
            .then(res => res.body);
    }
}
