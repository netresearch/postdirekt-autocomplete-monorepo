/**
 * See LICENSE.md for license details.
 */

export default class DatalistSelect {
    /**
     * Initialize.
     *
     * @param {Map<string, HTMLElement>} fields
     * @param {AutocompleteAddressSuggestions} addressSuggestions
     *
     * @constructor
     */
    constructor(fields, addressSuggestions)
    {
        this.fields          = fields;
        this.addressSuggestions = addressSuggestions;
    }

    /**
     * Returns the selected suggestion object.
     *
     * @returns {boolean|Object}
     */
    getCurrentSuggestion()
    {
        if (this.currentSuggestionObject.uuid) {
            return this.currentSuggestionObject;
        }

        return false;
    }

    /**
     * Updates all observed fields.
     *
     * @param {string} optionId
     * @param {AutocompleteAddressData} addressData
     */
    updateFields(optionId, addressData)
    {
        const self = this,
            suggestions = this.addressSuggestions;

        if (optionId) {
            this.currentSuggestionObject = suggestions.getByUuid(optionId);
        }
        if (self.currentSuggestionObject.uuid) {
            // Fill all fields with response values
            self.fields.forEach(function (field, fieldName) {
                if (field && self.currentSuggestionObject[fieldName]) {
                    field.value = self.currentSuggestionObject[fieldName];
                    addressData.setDataFromField(field);
                }
            });
        }
    }
}
