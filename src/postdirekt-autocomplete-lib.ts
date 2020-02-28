/**
 * See LICENSE.txt for license details.
 */
import AddressAutocomplete from './model/autocomplete-handler';
import AddressInputType from './api/address-input-types';

const init = (
    streetInput: HTMLInputElement,
    cityInput: HTMLInputElement,
    postalCodeInput: HTMLInputElement,
    countryInput: HTMLInputElement,
    deCountryId: string,
    token: string,
): AddressAutocomplete => {
    const autocomplete = new AddressAutocomplete(
        new Map([
            [AddressInputType.Street, streetInput],
            [AddressInputType.PostalCode, postalCodeInput],
            [AddressInputType.City, cityInput],
        ]),
        countryInput,
        deCountryId,
        token,
    );

    autocomplete.start();

    return autocomplete;
};

export default { init };
