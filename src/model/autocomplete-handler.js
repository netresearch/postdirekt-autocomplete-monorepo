/**
 * See LICENSE.md for license details.
 */

import AutocompleteAddressSuggestions from './autocomplete-address-suggestions';
import AutocompleteAddressData from './autocomplete-address-data';
import CountrySelect from './country-select';
import DatalistSelect from '../action/datalist-select';
import ListRenderer from '../view/list-renderer';
import postdirektAutocomplete from 'postdirekt-autocomplete';

export default class AddressAutocomplete {

    /**
     *
     * @param {{type: string, input: HTMLElement}[]} watchedFields
     * @param {{type: string, input: HTMLElement}} countrySelect
     * @param {string} deCountryId
     * @param {string} token
     */
    constructor(watchedFields, countrySelect, deCountryId, token)
    {
        this.token = token;
        this.addressFields = new Map(watchedFields.map(field => [field.type, field.input]));
        this.addressSuggestions = new AutocompleteAddressSuggestions(this.addressFields);
        this.addressData = new AutocompleteAddressData();
        this.countrySelect = new CountrySelect(countrySelect, deCountryId);
        this.datalistSelectAction = new DatalistSelect(this.addressFields, this.addressSuggestions);
        this.datalistRenderer = new ListRenderer(this.addressSuggestions, this.addressItemDivider)
    }

    start()
    {
      this.addressFields.forEach(function (fieldItem, type) {
            fieldItem.setAttribute('data-address-item', type);
            fieldItem.addEventListener('keyup', this.handleFieldKeystroke.bind(this));
            fieldItem.addEventListener('focus', this.handleFieldFocus.bind(this));
            fieldItem.addEventListener('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
        }.bind(this));

        /*for ongoing tasks*/
        this.removeListOnCountryChange();
        this.addressFields.forEach(function (selector) {
            /** @var {HTMLInputElement} field */
            const field = document.querySelector(selector);
            this.addressData.setDataFromField(field);
        }.bind(this));
        this.searchService = postdirektAutocomplete.createSearchService(this.token);
        this.selectService = postdirektAutocomplete.createSelectService(this.token);
    }

    /**
     * Handles keystrokes, but does not react to navigation keys.
     * @public
     * @param {KeyboardEvent} e
     */
    handleFieldKeystroke(e)
    {
        const navigatorCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];

        if (navigatorCodes.indexOf(e.code) === -1) {
            /** @var {HTMLInputElement} field */
            const field = e.target;
            if (field) {
                this.addressData.setDataFromField(field);
                this.triggerDelayedCallback(
                    function () {
                        this.searchAction(field)
                    }.bind(this),
                    this.typingDelay
                );
            }
        }
    }

    /**
     * @private
     * @param {FocusEvent} e
     */
    handleFieldFocus(e)
    {
        /** @var {HTMLInputElement} field */
        const field = e.target;
        this.addressData.setDataFromField(field);
    }

    /**
     * @private
     * @param {Event} e
     */
    handleDatalistSelect(e)
    {
        const uuid = this.datalistRenderer.getSuggestionUuid(e.target);

        // Update all observed fields after item was selected in datalist
        this.datalistSelectAction.updateFields(uuid, this.addressData);
        this.selectAction();
    }

    /**
     * Triggers an delayed callback.
     *
     * @private
     * @param {Function} callback Callback to execute after timeout
     * @param {int}      delay    Delay in milliseconds
     */
    triggerDelayedCallback(callback, delay)
    {
        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId === 'number') {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay
        );
    }

    /**
     * Executes a search request.
     *
     * @private
     * @param {HTMLElement} currentField
     */
    searchAction(currentField)
    {
        if (this.addressData.isEmpty()) {
            return;
        }

        if (this.countrySelect.isGermany) {
            const addressData = this.addressData.getData(),
                subject = addressData.street.length === 0 ?
                    postdirektAutocomplete.SearchSubjects.PostalCodesCities :
                    postdirektAutocomplete.SearchSubjects.PostalCodesCitiesStreets;

            this.searchService.search(
                this.searchService.requestBuilder.create(
                    {
                        country: 'de',
                        subject: subject,
                        combined: Object.values(addressData).join(' '),
                    }
                )
            ).then(function (response) {
                this.addressSuggestions.setAddressSuggestions(response.addresses);
                /* Only render anything if the input is still active. */
                if (currentField === document.activeElement) {
                    this.datalistRenderer.render(currentField);
                }
            }.bind(this));
        }
    }

    /**
     * Executes a select request.
     *
     * @private
     */
    selectAction()
    {
        const selectedSuggestion = this.datalistSelectAction.getCurrentSuggestion();
        if (!selectedSuggestion || !selectedSuggestion.uuid) {
            throw 'Missing required field <uuid>';
        }
        this.selectService.select(
            this.selectService.requestBuilder.create(
                {
                    country: 'de',
                    subject: postdirektAutocomplete.SearchSubjects.PostalCodesCitiesStreets,
                    uuid: selectedSuggestion.uuid,
                }
            )
        ).catch(
            console.log
        );
    }

    /**
     * Remove all datalists when country is not Germany.
     *
     * @private
     */
    removeListOnCountryChange()
    {
        this.countrySelect.listenOnChange(function (isGermany) {
            if (!isGermany) {
                this.addressFields.forEach(function (selector) {
                    const field = document.querySelector(selector);
                    this.datalistRenderer.removeDatalist(field);
                }.bind(this));
            }
        }.bind(this));
    }
}
