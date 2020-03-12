import SearchSubject from './search-subjects';

/**
 * Description of a request in the autocomplete API context
 */
export interface RequestInterface {
    url: string;
    method: string;
    headers: Record<string, string>;
}

export interface PathParams {
    subject: SearchSubject;
    country: string;
}

export interface QueryParams {
    city?: string;
    distributionCode?: string;
    district?: string;
    houseNumber?: string;
    postalCode?: string;
    street?: string;
    combined?: string;
}

export interface SearchOptions extends QueryParams, PathParams {
}

export interface SelectOptions extends SearchOptions {
    uuid: string;
}

/**
 * Builder that is capable of creating request objects from given parameters
 */
export default interface RequestBuilderInterface {

    /**
   * Create request from given options
   * @param options
   */
    create(options: SearchOptions): RequestInterface;
}
