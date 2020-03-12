import { RequestInterface } from './request-builder-interface';
import SelectRequestBuilder from '../model/request/select-request-builder';

/**
 * Service for searching completion suggestions
 */
export default interface SelectServiceInterface {
    readonly requestBuilder: SelectRequestBuilder;

    /**
   * Perform a select request given the configured request data
   * @param request
   */
    select(request: RequestInterface): Promise<void> ;
}
