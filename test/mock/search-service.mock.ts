import SearchServiceInterface from 'postdirekt-autocomplete/src/api/search-service-interface';
import SearchRequestBuilder from 'postdirekt-autocomplete/src/model/request/search-request-builder';
import SearchResponse, { Address } from 'postdirekt-autocomplete/src/model/response/search-response';

export default class MockSearchService implements SearchServiceInterface {
    private addresses: Address[];

    requestBuilder: SearchRequestBuilder;

    constructor(mockData: Address[]) {
        this.addresses = mockData;
        this.requestBuilder = new SearchRequestBuilder('url', 'token');
    }

    public search = jest.fn(
        () => Promise.resolve({ addresses: this.addresses }),
    ) as jest.Mock<Promise<SearchResponse>>;
}
