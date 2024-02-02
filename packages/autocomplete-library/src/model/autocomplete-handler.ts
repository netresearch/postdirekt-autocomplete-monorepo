/**
 * See LICENSE.md for license details.
 */

import SearchSubject from '@netresearch/postdirekt-autocomplete-sdk/src/api/search-subjects';
import ServiceFactory from '@netresearch/postdirekt-autocomplete-sdk/src/service/service-factory';
import SearchServiceInterface from '@netresearch/postdirekt-autocomplete-sdk/src/api/search-service-interface';
import SelectServiceInterface from '@netresearch/postdirekt-autocomplete-sdk/src/api/select-service-interface';
import SearchResponse, { Address } from '@netresearch/postdirekt-autocomplete-sdk/src/model/response/search-response';
import AddressType from '@netresearch/postdirekt-autocomplete-sdk/src/api/address-types';
import AutocompleteAddressSuggestions from './autocomplete-address-suggestions';
import AutocompleteDomAddress from './autocomplete-dom-address';
import ListRenderer from '../view/list-renderer';
import AddressInputType from '../api/address-input-types';
import HintRenderer from '../view/hint-renderer';

export default class AddressAutocomplete {
    private readonly navigationKeyCodes = ['ArrowUp', 'ArrowDown', 'Escape', 'Enter', 'Space', 'Tab'];

    private readonly searchService: SearchServiceInterface;

    private readonly selectService: SelectServiceInterface;

    private readonly inputMap: Map<AddressInputType, HTMLInputElement>;

    private readonly addressSuggestions: AutocompleteAddressSuggestions;

    private readonly domAddress: AutocompleteDomAddress;

    private readonly countrySelect: HTMLInputElement;

    private readonly listRenderer: ListRenderer;

    private readonly hintRenderer: HintRenderer;

    private readonly deCountryId: string;

    private readonly typingDelay = 500;

    private timeoutId?: number;

    private readonly renderSuggestions: boolean;

    constructor(
        inputMap: Map<AddressInputType, HTMLInputElement>,
        countrySelect: HTMLInputElement,
        deCountryId: string,
        token: string,
        hint: string,
        renderSuggestions: boolean,
    ) {
        this.inputMap = inputMap;
        this.countrySelect = countrySelect;
        this.deCountryId = deCountryId;
        this.searchService = ServiceFactory.createSearchService(token);
        this.selectService = ServiceFactory.createSelectService(token);
        this.addressSuggestions = new AutocompleteAddressSuggestions();
        this.domAddress = new AutocompleteDomAddress(this.inputMap);
        this.listRenderer = new ListRenderer();
        this.hintRenderer = new HintRenderer(hint);
        this.renderSuggestions = renderSuggestions;
    }

    /**
     * Initialize event listeners on the given address DOM inputs elements.
     */
    public start(): void {
        for (const fieldItem of this.inputMap.values()) {
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

        if (!this.navigationKeyCodes.includes(e.code)) {
            this.triggerDelayedCallback(
                () => this.searchAction(e.target as HTMLInputElement),
                this.typingDelay,
            );
        }
        if (e.code !== 'Enter') {
            this.hintRenderer.remove();
        }
    }

    /**
     * Update the DOM input values with the selected address suggestion
     * and perform an API select request.
     */
    public handleDatalistSelect(e: Event): void {
        const field = e.target as HTMLInputElement;
        const uuid = field.dataset.suggestionUuid as string;
        const suggestedAddress = this.addressSuggestions.getByUuid(uuid);
        const streetField = this.inputMap.get(AddressInputType.Street);
        if (!suggestedAddress) {
            return;
        }

        this.domAddress.address = suggestedAddress;
        this.selectAction(suggestedAddress.uuid);

        if (streetField && streetField === field) {
            this.hintRenderer.render(streetField);
        }
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
        const subject: SearchSubject = addressData.street
            ? SearchSubject.PostalCodesCitiesStreets
            : SearchSubject.PostalCodesCities;

        if (Object.values(addressData).join('').trim() === '') {
            return;
        }

        this.searchService.search(
            this.searchService.requestBuilder.create(
                {
                    country: 'de',
                    subject,
                    combined: Object.values(addressData).join(' '),
                    address_type: AddressType.A,
                },
            ),
        ).then((response: SearchResponse) => {
            // Map search service response into AddressData array
            // and store them in suggestions model
            this.addressSuggestions.suggestions = response.addresses
                .filter((address: Address) => !!address.uuid)
                .map(
                    (address: Address) => ({
                        street: address.street || '',
                        postalCode: address.postalCode || '',
                        city: address.city || '',
                        uuid: address.uuid,
                        district: address.district,
                    }),
                );

            document.dispatchEvent(
                new CustomEvent(
                    'autocomplete:suggestions-retrieve',
                    { detail: { suggestions: this.addressSuggestions.suggestions } },
                ),
            );

            /* Only render anything if the input is still active. */
            if (currentField === document.activeElement && this.renderSuggestions) {
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
                    subject: SearchSubject.PostalCodesCitiesStreets,
                    uuid,
                },
            ),
        );
    }
}
