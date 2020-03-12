/**
 * See LICENSE.txt for license details.
 */
export default interface SearchResponse {
    addresses: Address[];
}

export interface Address {
    uuid: string;
    postalCode?: string;
    city?: string;
    street?: string;
    addressType?: string;
    district?: string;
}
