import { RequestInterface } from '../../api/request-builder-interface';

export default class SearchRequest implements RequestInterface {
    public readonly url: string = '';

    public readonly method: string = 'GET';

    public readonly headers: Record<string, string> = {};

    constructor(url: string, method = 'GET', headers: Record<string, string> = {}) {
        this.url = url;
        this.method = method;
        this.headers = headers;
    }
}
