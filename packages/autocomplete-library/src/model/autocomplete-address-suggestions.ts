/**
 * See LICENSE.md for license details.
 */

import AddressData from '../api/address-data';

export default class AutocompleteAddressSuggestions {
    /**
     * Data storage for address suggestions from the Autocomplete API.
     */
    public suggestions: AddressData[] = [];

    /**
     * Returns suggestion item with the given UUID.
     */
    public getByUuid(uuid: string): AddressData|null {
        return this.suggestions.find((item) => item.uuid === uuid) || null;
    }
}
