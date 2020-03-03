/**
 * See LICENSE.md for license details.
 */

import DomAddressData from '../api/dom-address-data';
import AddressInputType from '../api/address-input-types';

/**
 * Sync data from and to the DOM address inputs.
 * */
export default class AutocompleteDomAddress {
    private readonly inputMap: Map<AddressInputType, HTMLInputElement>;

    constructor(inputMap: Map<AddressInputType, HTMLInputElement>) {
        this.inputMap = inputMap;
    }

    /**
     * Read current address input values from DOM.
     */
    get address(): DomAddressData {
        const result: DomAddressData = { city: '', postalCode: '', street: '' };
        /**
         * Note that type safety is guaranteed by the DomAddressData properties
         * being constructed from the AddressInputType enum, same with the inputMap keys.
         * They keys in the following iteration therefore always match
         */
        this.inputMap.forEach((input, type) => {
            result[type] = input.value;
        });

        return result;
    }

    /**
     * Update DOM input values with new address data.
     */
    set address(newAddressData: DomAddressData) {
        /**
         * Note that type safety is guaranteed by the DomAddressData properties
         * being constructed from the AddressInputType enum, same with the inputMap keys.
         * They keys in the following iteration therefore always match
         */
        for (const [fieldName, field] of this.inputMap) {
            field.value = newAddressData[fieldName];
            field.dispatchEvent(new Event('change'));
        }
    }
}
