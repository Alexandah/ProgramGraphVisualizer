import * as request from "superagent";
import { API_BASE_URL } from "src/env";
import AuthAPI from "src/api/auth";
import { WidgetModel } from "src/part/widget";
import QParamModel from "src/model/qparam";
import AppModel from "src/model/app";


export default class CoreAPI {

    static fetchData(rsName: string, query?: QParamModel): Promise<any[]> {
        return request
            .get(`${API_BASE_URL}/v1/${rsName}${query ? query.toQueryString() : ""}`)
            .set(AuthAPI.authHeaders)
            .then(res => res.body);
    }

    static fetchStats(rsName: string): Promise<WidgetModel[]> {
        return request
            .get(`${API_BASE_URL}/v1/${rsName}/stats`)
            .set(AuthAPI.authHeaders)
            .then(res => {
                let resp = res.body;
                if (resp == null)
                    resp = []
                while (resp.length < 4)
                    resp.push(AppModel.widgetOff)
                return resp;

            })
            .catch(r => {
                return [AppModel.widgetErr, AppModel.widgetErr, AppModel.widgetErr, AppModel.widgetErr]
            });
    }
}