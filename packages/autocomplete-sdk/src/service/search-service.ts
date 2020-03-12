/**
 * See LICENSE.txt for license details.
 */
import SearchServiceInterface from '../api/search-service-interface';
import SearchRequestBuilder from '../model/request/search-request-builder';
import SearchResponse from '../model/response/search-response';
import AdapterInterface from '../model/adapter-interface';
import { RequestInterface } from '../api/request-builder-interface';

/**
 * Search service for searching address completion suggestions
 */
export default class SearchService implements SearchServiceInterface {
    private adapter: AdapterInterface;

    readonly requestBuilder: SearchRequestBuilder;

    constructor(
        accessToken: string,
        baseUrl: string,
        adapter: AdapterInterface,
    ) {
        this.adapter = adapter;

        this.requestBuilder = new SearchRequestBuilder(baseUrl, accessToken);
    }

    /**
   * Perform a search request
   *
   * @param request RequestInterface
   */
    public async search(request: RequestInterface): Promise<SearchResponse> {
        return await this.adapter.request(request) as SearchResponse;
    }
}
