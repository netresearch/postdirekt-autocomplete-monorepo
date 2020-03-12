import SearchRequestBuilder from '../model/request/search-request-builder';
import { RequestInterface } from './request-builder-interface';
import SearchResponse from '../model/response/search-response';

/**
 * Service for searching completion suggestions
 */
export default interface SearchServiceInterface {
    readonly requestBuilder: SearchRequestBuilder;

    /**
   * Perform a search request given the configured request data
   * @param request RequestInterface
   */
    search(request: RequestInterface): Promise<SearchResponse>;
}
