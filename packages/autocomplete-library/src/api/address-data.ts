/**
 * See LICENSE.txt for license details.
 */

import DomAddressData from './dom-address-data';

/**
 * Entity for Address data that was returned by the Autocomplete search service
 */
type AddressData = DomAddressData & {
    uuid: string;
    addressType?: string;
    district?: string;
};
export default AddressData;
