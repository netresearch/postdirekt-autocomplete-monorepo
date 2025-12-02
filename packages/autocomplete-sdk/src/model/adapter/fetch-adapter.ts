 
/**
 * See LICENSE.txt for license details.
 */
import { RequestInterface } from '../../api/request-builder-interface';
import AdapterInterface from '../adapter-interface';
import SearchResponse from '../response/search-response';

/**
 * Adapter implementation utilizing fetch and therefore only working in browser contexts
 */
export default class FetchAdapter implements AdapterInterface {
    /**
   * Perform arbitrary HTTP request
   *
   * @param request RequestInterface
   */
    public async request(request: RequestInterface): Promise<SearchResponse | string | void> {
        const apiRequest = new Request(request.url, {
            method: request.method,
            headers: request.headers,
        });
        const response = await fetch(apiRequest);
        // the Autocomplete API only responds with json if there is a success state
        if (response.status >= 200 && response.status < 300) {
            if (response.headers.get('Content-Type')?.startsWith('application/json')) {
                return response.json();
            }
            return response.text();
        }
        if (response.status === 400) {
            return response.json().then((r) => {
                throw new Error((`${response.statusText}: ${r.message}`).trim());
            });
        }
        return response.text().then((t) => {
            throw new Error((`${response.statusText} ${t}`).trim());
        });
    }
}
