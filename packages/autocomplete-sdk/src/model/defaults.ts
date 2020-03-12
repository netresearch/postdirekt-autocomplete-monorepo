/**
 * See LICENSE.txt for license details.
 */
import AdapterInterface from './adapter-interface';
import FetchAdapter from './adapter/fetch-adapter';

/**
 * Static class for providing global defaults
 */
export default class DefaultSettings {
    public static readonly baseUrl: string = 'https://autocomplete2.postdirekt.de/autocomplete2/';

    public static readonly headers: object = {
        Accept: 'application/json',
        Authorization: '',
    };

    /**
   * Get suitable adapter for current environment
   */
    public static getAdapter(): AdapterInterface {
        /**
     * @TODO later we want to dynamically check if the environment is node or browser
     */
        return new FetchAdapter();
    }
}
