/**
 * See LICENSE.txt for license details.
 */
import SelectRequestBuilder from '../model/request/select-request-builder';
import AdapterInterface from '../model/adapter-interface';
import { RequestInterface } from '../api/request-builder-interface';
import SelectServiceInterface from '../api/select-service-interface';

/**
 * Select service for submitting selection to the API
 */
export default class SelectService implements SelectServiceInterface {
    private adapter: AdapterInterface;

    readonly requestBuilder: SelectRequestBuilder;

    constructor(
        accessToken: string,
        baseUrl: string,
        adapter: AdapterInterface,
    ) {
        this.adapter = adapter;

        this.requestBuilder = new SelectRequestBuilder(baseUrl, accessToken);
    }

    /**
   * Perform a select request
   *
   * @param request RequestInterface
   */
    public async select(request: RequestInterface): Promise<void> {
        return this.adapter.request(request) as Promise<void>;
    }
}
