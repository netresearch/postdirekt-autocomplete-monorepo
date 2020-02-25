/**
 * See LICENSE.txt for license details.
 */

import AddressInputType from './address-input-types';

/**
 * Address data that is/can be persisted in the DOM
 */
type DomAddressData = {
    [key in AddressInputType]: string;
};
export default DomAddressData;
