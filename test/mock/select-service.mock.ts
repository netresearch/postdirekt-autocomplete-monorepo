import SelectServiceInterface from 'postdirekt-autocomplete/src/api/select-service-interface';
import SelectRequestBuilder
    from 'postdirekt-autocomplete/src/model/request/select-request-builder';

export default class MockSelectService implements SelectServiceInterface {
    requestBuilder: SelectRequestBuilder;

    constructor() {
        this.requestBuilder = new SelectRequestBuilder('url', 'token');
    }

    public select = jest.fn(() => Promise.resolve(undefined));
}
