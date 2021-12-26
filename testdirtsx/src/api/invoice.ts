import * as request from "superagent";
import { API_BASE_URL } from "src/env";
import AuthAPI from "./auth";


export default class InvoiceAPI {
    static pushInvoiceCollectionToQuickBooks(arr: string[]): Promise<string[]> {
        return request
            .post(`${API_BASE_URL}/v1/quickbooks/invoices/push`)
            .set(AuthAPI.authHeaders)
            .send(arr)
            .then(res => res.body);
    }

    static createInvoicesFromAccessPlusContributions(): Promise<string[]> {
        return request
            .post(`${API_BASE_URL}/v1/accessPlus/contributions/createInvoices`)
            .set(AuthAPI.authHeaders)
            .then(res => res.body);
    }

    static createInvoicesFromSelectPlusContributions(): Promise<string[]> {
        return request
            .post(`${API_BASE_URL}/v1/selectPlus/contributions/createInvoices`)
            .set(AuthAPI.authHeaders)
            .then(res => res.body);
    }

    static createPaymentsForSelectPlusInvoices(): Promise<string[]> {
        return request
            .put(`${API_BASE_URL}/v1/selectPlus/payments/create`)
            .set(AuthAPI.authHeaders)            
            .then(res => res.body);
    }

    static createPaymentsForAccessPlusInvoices(): Promise<string[]> {
        return request
            .put(`${API_BASE_URL}/v1/accessPlus/payments/create`)
            .set(AuthAPI.authHeaders)            
            .then(res => res.body);
    }
}
