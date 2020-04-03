import SelectServiceInterface from '@netresearch/postdirekt-autocomplete-sdk/src/api/select-service-interface';
import SelectRequestBuilder
    from '@netresearch/postdirekt-autocomplete-sdk/src/model/request/select-request-builder';

export default class MockSelectService implements SelectServiceInterface {
    requestBuilder: SelectRequestBuilder;

    constructor() {
        this.requestBuilder = new SelectRequestBuilder('url', 'token');
    }

    public select = jest.fn(() => Promise.resolve(undefined));
}
