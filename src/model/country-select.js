/**
 * See LICENSE.md for license details.
 */

export default class CountrySelect {
    /**
     * Initialize.
     *
     * @param {{type: string, input: HTMLElement}} countrySelect
     * @param {string} deCountryId
     *
     * @constructor
     */
    constructor(countrySelect, deCountryId)
    {
        this.countrySelect = countrySelect.input;
        this.germanCountryId = deCountryId;
        if (this.countrySelect.value === this.germanCountryId) {
            this.isGermany = true;
        }
    }

    /**
     * @param callback Is executed every time the address country changes.
     *                 Will recieve boolean this.isGermany as parameter.
     */
    listenOnChange(callback)
    {
        this.countrySelect.addEventListener('change', function (e) {
            this.isGermany = (e.target.value === this.germanCountryId);
            callback(this.isGermany);
        }.bind(this));
    }
}
