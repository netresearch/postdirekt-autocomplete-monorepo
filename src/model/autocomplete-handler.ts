/**
 * See LICENSE.md for license details.
 */

import postdirektAutocomplete from 'postdirekt-autocomplete';
import SearchService from 'postdirekt-autocomplete/dist/lib/service/search-service';
import SelectService from 'postdirekt-autocomplete/dist/lib/service/select-service';
import SearchResponse, { Address } from 'postdirekt-autocomplete/dist/lib/model/response/search-response';
import AddressData from '../api/address-data';
import AutocompleteAddressSuggestions from './autocomplete-address-suggestions';
import AutocompleteDomAddress from './autocomplete-dom-address';
import ListRenderer from '../view/list-renderer';
import AddressInputType from '../api/address-input-types';

export default class AddressAutocomplete {
    private readonly navigationKeyCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];

    private readonly searchService: SearchService;

    private readonly selectService: SelectService;

    private readonly inputMap: Map<AddressInputType, HTMLInputElement>;

    private readonly addressSuggestions: AutocompleteAddressSuggestions;

    private readonly domAddress: AutocompleteDomAddress;

    private readonly countrySelect: HTMLInputElement;

    private readonly listRenderer: ListRenderer;

    private readonly deCountryId: string;

    private readonly typingDelay = 500;

    private timeoutId?: number;

    constructor(
        inputMap: Map<AddressInputType, HTMLInputElement>,
        countrySelect: HTMLInputElement,
        deCountryId: string,
        token: string,
    ) {
        this.inputMap = inputMap;
        this.countrySelect = countrySelect;
        this.deCountryId = deCountryId;
        this.searchService = postdirektAutocomplete.createSearchService(token) as SearchService;
        this.selectService = postdirektAutocomplete.createSelectService(token);
        this.addressSuggestions = new AutocompleteAddressSuggestions();
        this.domAddress = new AutocompleteDomAddress(this.inputMap);
        this.listRenderer = new ListRenderer();
    }

    /**
     * Initialize event listeners on the given address DOM inputs elements.
     */
    public start(): void {
        for (const [type, fieldItem] of this.inputMap) {
            // Set the type of input into a data attribute
            // to know the type when the element is triggering an event listener.
            fieldItem.setAttribute('data-autocomplete-address-type', type);

            // Attach event listeners
            fieldItem.addEventListener('keyup', this.handleFieldKeystroke.bind(this));
            fieldItem.addEventListener('autocomplete:datalist-select', this.handleDatalistSelect.bind(this));
        }
        this.countrySelect.addEventListener('change', this.handleCountryChange.bind(this));
    }

    /**
     * Handles keystrokes, but does not react to navigation keys.
     */
    public handleFieldKeystroke(e: KeyboardEvent): void {
        if (this.countrySelect.value !== this.deCountryId) {
            return;
        }

        if (this.navigationKeyCodes.includes(e.code)) {
            this.triggerDelayedCallback(
                () => this.searchAction(e.target as HTMLInputElement),
                this.typingDelay,
            );
        }
    }

    /**
     * Update the DOM input values with the selected address suggestion
     * and perform an API select request.
     */
    public handleDatalistSelect(e: Event): void {
        const selectedOption = e.target as HTMLElement;
        const suggestedAddress = this.addressSuggestions.getByUuid(selectedOption.id);

        if (!suggestedAddress) {
            return;
        }

        this.domAddress.address = suggestedAddress;

        this.selectAction(suggestedAddress.uuid);
    }

    /**
     * Remove any existing suggestion list from the DOM if the country is changed away from germany.
     */
    public handleCountryChange(): void {
        if (this.countrySelect.value !== this.deCountryId) {
            this.listRenderer.remove();
        }
    }

    /**
     * Trigger a given callback with the given delay.
     * If called multiple times, queued callbacks are discarded.
     */
    private triggerDelayedCallback(callback: () => void, delay: number): void {
        // Clear timeout to prevent previous task from execution
        if (typeof this.timeoutId !== undefined) {
            clearTimeout(this.timeoutId);
        }

        this.timeoutId = window.setTimeout(
            callback,
            delay,
        );
    }

    /**
     * Execute a search request at the Autocomplete API,
     * update the AddressSuggestions model,
     * and render a suggestion list in the DOM.
     */
    private searchAction(currentField: HTMLInputElement): void {
        const addressData = this.domAddress.address;
        const subject: postdirektAutocomplete.SearchSubjects = addressData.street
            ? postdirektAutocomplete.SearchSubjects.PostalCodesCities
            : postdirektAutocomplete.SearchSubjects.PostalCodesCitiesStreets;

        this.searchService.search(
            this.searchService.requestBuilder.create(
                {
                    country: 'de',
                    subject,
                    combined: Object.values(addressData).join(' '),
                },
            ),
        ).then((response: SearchResponse) => {
            // Map search service response into AddressData array
            // and store them in suggestions model
            this.addressSuggestions.suggestions = response.addresses.reduce(
                (filtered: AddressData[], address: Address) => {
                    // ignore all results with no uuid.
                    if (!address.uuid) {
                        return filtered;
                    }
                    filtered.push({
                        street: address.street ?? '',
                        postalCode: address.postalCode ?? '',
                        city: address.city ?? '',
                        uuid: address.uuid,
                        district: address.district,
                    });
                    return filtered;
                },
                [],
            );

            /* Only render anything if the input is still active. */
            if (currentField === document.activeElement) {
                this.listRenderer.render(
                    currentField,
                    this.addressSuggestions.suggestions,
                );
            }
        });
    }

    /**
     * Executes a select request at the Autocomplete API.
     */
    private selectAction(uuid: string): void {
        this.selectService.select(
            this.selectService.requestBuilder.create(
                {
                    country: 'de',
                    subject: postdirektAutocomplete.SearchSubjects.PostalCodesCitiesStreets,
                    uuid,
                },
            ),
        );
    }
}
