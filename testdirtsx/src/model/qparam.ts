export default class QParamModel {

    constructor(sort?: string[], filter?: string, page?: number, page_size?: number, proj?: string[]) {
        this.filter = filter;
        this.sort = sort;
        this.page = page || 1;
        this.page_size = page_size || 100;
        this.projection = proj;
    }
    filter?: string;
    sort?: string[];
    page: number = 1;
    page_size: number = 100;
    projection?: string[];

    toQueryString() {
        let res = "?page=" + this.page + "&size=" + this.page_size;
        if (this.filter != null)
            res += "&filter=" + this.filter;
        if (this.projection != null && this.projection.length != 0)
            res += "&projection=" + this.projection.join();
        if (this.sort != null)
            res += "&sort=" + this.sort.join();
        return res;
    }
}

