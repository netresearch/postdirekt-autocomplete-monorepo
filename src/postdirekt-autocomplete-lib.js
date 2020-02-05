/**
 * See LICENSE.txt for license details.
 */
import AddressAutocomplete from "./model/autocomplete-handler";

const init = function (watchedFields, countrySelect, deCountryId, token) {
    const autocomplete = new AddressAutocomplete(watchedFields, countrySelect, deCountryId, token);
    autocomplete.start();
    return autocomplete;
};

export {init};
