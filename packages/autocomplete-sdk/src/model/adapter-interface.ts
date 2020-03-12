/**
 * See LICENSE.txt for license details.
 */
import { RequestInterface } from '../api/request-builder-interface';
import SearchResponse from './response/search-response';

/**
 * Abstraction layer for handling nodejs vs browser environments
 * (with fetch xor http being available)
 */
export default interface AdapterInterface {
    /**
   * Perform HTTP request via fetch or http
   *
   * @param request RequestInterface
   */
    request(request: RequestInterface): Promise<SearchResponse | string | void>;
}
