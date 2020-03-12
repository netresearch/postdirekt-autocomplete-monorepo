import SearchServiceInterface from './search-service-interface';
import SelectServiceInterface from './select-service-interface';

/**
 * Factory for creating service models offered by this SDK
 */
export default interface ServiceFactoryInterface {
    /**
   * Create service class able to query autocomplete suggestions
   * @param accessToken
   */
    createSearchService(accessToken: string): SearchServiceInterface;

    /**
   * Create service class able to select a previously given suggestion
   *
   * @param accessToken
   */
    createSelectService(accessToken: string): SelectServiceInterface;
}
