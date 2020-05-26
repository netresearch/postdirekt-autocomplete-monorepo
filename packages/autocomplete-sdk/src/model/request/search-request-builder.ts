/**
 * See LICENSE.txt for license details.
 */
import RequestBuilderInterface, {
    QueryParams,
    SearchOptions,
    RequestInterface,
} from '../../api/request-builder-interface';
import SearchSubject from '../../api/search-subjects';
import DefaultSettings from '../defaults';
import Request from './request';


/**
 * Request builder for search request
 */
export default class SearchRequestBuilder implements RequestBuilderInterface {
    private readonly baseUrl: string;

    private readonly accessToken: string;

    private readonly addressTypeSupported: SearchSubject[] = [
        SearchSubject.PostalCodesCitiesDistrictsStreets,
        SearchSubject.PostalCodesCitiesStreets,
    ];

    constructor(baseUrl: string, accessToken: string) {
        this.baseUrl = baseUrl;
        this.accessToken = accessToken;
    }

    /**
     * Generate a search request with given search options
     * @param options SearchOptions
     */
    create(options: SearchOptions): RequestInterface {
        const { subject, country, ...params } = options;

        if (!params.address_type || !this.addressTypeSupported.includes(subject)) {
            delete params.address_type;
        }

        return new Request(
            this.buildUrl(country, subject, params as QueryParams),
            'GET',
            {
                ...DefaultSettings.headers,
                ...{ Authorization: `Bearer ${this.accessToken}` },
            },
        );
    }

    /**
     * Generate final url with query parameters
     *
     * @param country string
     * @param subject Subject
     * @param params QueryParams
     */
    private buildUrl(country: string, subject: SearchSubject, params: QueryParams): string {
        // add country to path
        let urlString = `${this.baseUrl}/${country}`;
        // add subject to path
        urlString = `${urlString}/${subject}`;
        // add query parameters
        urlString += SearchRequestBuilder.buildQueryString(params);

        return urlString;
    }

    /**
     * Generate query string from parameter configuration
     *
     * @param params QueryParams
     */
    private static buildQueryString(params: QueryParams): string {
        let queryString: string = Object.entries(params)
            .map(([key, val]) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&');

        if (queryString) {
            queryString = `?${queryString}`;
        }

        return queryString;
    }
}
