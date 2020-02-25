/**
 * See LICENSE.txt for license details.
 */
import AddressAutocomplete from './model/autocomplete-handler';
import AddressInputType from './api/address-input-types';

const init = (
    inputMap: Map<AddressInputType, HTMLInputElement>,
    countrySelect: HTMLInputElement,
    deCountryId: string,
    token: string,
): AddressAutocomplete => {
    const autocomplete = new AddressAutocomplete(inputMap, countrySelect, deCountryId, token);

    autocomplete.start();

    return autocomplete;
};

export default { init };
