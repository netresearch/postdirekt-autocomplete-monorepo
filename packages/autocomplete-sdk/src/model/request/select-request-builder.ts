/**
 * See LICENSE.txt for license details.
 */
import RequestBuilderInterface, { SelectOptions, RequestInterface } from '../../api/request-builder-interface';
import SearchRequestBuilder from './search-request-builder';

/**
 * Request builder for select requests
 */
export default class SelectRequestBuilder
    extends SearchRequestBuilder implements RequestBuilderInterface {
    uuid?: string;

    /**
   * Create a request for selecting a specific suggestion
   *
   * @param options SelectOptions
   */
    create(options: SelectOptions): RequestInterface {
        return super.create(options);
    }
}
