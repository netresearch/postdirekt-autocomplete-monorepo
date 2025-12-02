 
/**
 * See LICENSE.txt for license details.
 */
import SearchService from './search-service';
import SelectService from './select-service';
import DefaultSettings from '../model/defaults';
import ServiceFactoryInterface from '../api/service-factory-interface';
import SelectServiceInterface from '../api/select-service-interface';
import SearchServiceInterface from '../api/search-service-interface';

/**
 * Factory able to create search and select services
 */
export default class ServiceFactory implements ServiceFactoryInterface {
    public static createSearchService(accessToken: string): SearchServiceInterface {
        return new SearchService(
            accessToken,
            `${DefaultSettings.baseUrl}search`,
            DefaultSettings.getAdapter(),
        );
    }

    public static createSelectService(accessToken: string): SelectServiceInterface {
        return new SelectService(
            accessToken,
            `${DefaultSettings.baseUrl}select`,
            DefaultSettings.getAdapter(),
        );
    }

    createSearchService(accessToken: string): SearchServiceInterface {
        return ServiceFactory.createSearchService(accessToken);
    }

    createSelectService(accessToken: string): SelectServiceInterface {
        return ServiceFactory.createSelectService(accessToken);
    }
}
