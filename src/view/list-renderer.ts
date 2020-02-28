/**
 * See LICENSE.md for license details.
 */
import AddressSuggestionOption from '../api/address-suggestion-option';
import AddressData from '../api/address-data';
import Key from '../model/key-types';

export default class ListRenderer {
    private removableEventHandler?: ((e: KeyboardEvent) => void);

    private currentField?: HTMLInputElement;

    /**
     * Attach a given list of suggestions to the given DOM input element,
     * emulating a datalist element.
     *
     * Only one list can be rendered at a time.
     */
    public render(inputElement: HTMLInputElement, addressSuggestions: AddressData[]): void {
        if (!inputElement.parentElement) {
            throw Error('Input elements without a parent cannot be assigned a suggestion list.');
        }

        this.remove();

        this.currentField = inputElement;

        /** Disable native autocomplete to avoid overlapping suggestions. */
        inputElement.setAttribute('autocomplete', 'off');

        const dataList = document.createElement('ul');
        dataList.setAttribute('id', `datalist-${inputElement.id}`);
        dataList.setAttribute('class', 'datalist');
        dataList.setAttribute('style', `width:${inputElement.offsetWidth}px; top:${inputElement.offsetHeight}px;`);

        // Convert address data into AddressSuggestionOptions
        addressSuggestions.map((addressData: AddressData) => (
            {
                id: addressData.uuid,
                title: [addressData.street, addressData.postalCode, addressData.city].filter(Boolean).join(', '),
            }
        ))
            // Create HTML list of AddressSuggestionOptions
            .forEach((option: AddressSuggestionOption) => {
                const li = document.createElement('li');
                const label = document.createTextNode(option.title);

                li.setAttribute('id', option.id);
                li.setAttribute('data-value', option.title);
                li.appendChild(label);
                dataList.appendChild(li);
            });

        inputElement.parentElement.appendChild(dataList);
        inputElement.parentElement.classList.add('autocomplete-container');

        inputElement.setAttribute('list', `datalist-${inputElement.id}`);

        /**
         * Trigger an item select when a datalist option is clicked.
         */
        dataList.addEventListener('mousedown', (e) => {
            const option = e.target as HTMLElement;
            this.itemSelect(option);
            setTimeout(() => inputElement.focus(), 0);
        });

        /**
         * Remove the datalist when the field is no longer in focus.
         */
        inputElement.addEventListener('focusout', this.remove.bind(this));

        /**
         * Add listener to observe address field navigation keydowns.
         */
        this.removableEventHandler = this.navigationKeyListener.bind(this);

        inputElement.addEventListener('keydown', this.removableEventHandler);
    }

    /**
     * Remove the previously rendered list of suggestions.
     * Removes list from the DOM and detaches all custom event listeners.
     */
    public remove(): void {
        if (!this.removableEventHandler || !this.currentField) {
            return;
        }

        const datalist = document.querySelector(`#datalist-${this.currentField.id}`);
        if (datalist) {
            datalist.remove();
        }

        this.currentField.removeEventListener('keydown', this.removableEventHandler);

        this.currentField = undefined;
    }

    private navigationKeyListener(e: KeyboardEvent): void {
        if (e.key in Key) {
            if (e.key !== Key.Tab as string) {
                e.preventDefault();
            }
            this.triggerKeydown(e.key as Key);
        }
    }

    private triggerKeydown(key: Key): void {
        if (!this.currentField) {
            return;
        }

        const dataList = document.querySelector(`#datalist-${this.currentField.id}`);

        if (!dataList) {
            return;
        }

        const dataOptions: Array<Element> = Array.from(dataList.children);
        const activeItem: HTMLElement = dataList.querySelector('[data-active]') as HTMLElement;
        const firstItem = dataOptions.find(() => true) as Element;

        if (!activeItem && key === Key.Enter) {
            return;
        }

        if (key === Key.ArrowDown && !activeItem) {
            firstItem.setAttribute('data-active', 'true');
        } else if (activeItem) {
            let prevVisible: HTMLElement | null = null;
            let nextVisible: HTMLElement | null = null;

            dataOptions.forEach((element, index, array) => {
                if (element as HTMLElement === activeItem) {
                    prevVisible = array[index - 1] as HTMLElement;
                    nextVisible = array[index + 1] as HTMLElement;
                }
            });
            activeItem.removeAttribute('data-active');

            if (key === Key.ArrowUp) {
                if (prevVisible) {
                    prevVisible = prevVisible as HTMLElement;
                    prevVisible.setAttribute('data-active', 'true');
                    if (prevVisible.offsetTop < dataList.scrollTop) {
                        dataList.scrollTop -= prevVisible.offsetHeight;
                    }
                } else {
                    dataOptions[dataOptions.length - 1].setAttribute('data-active', 'true');
                }
            }
            if (key === Key.ArrowDown) {
                if (nextVisible) {
                    nextVisible = nextVisible as HTMLElement;
                    nextVisible.setAttribute('data-active', 'true');
                } else {
                    dataOptions[0].setAttribute('data-active', 'true');
                }
            }

            if (key === Key.Tab) {
                // Focus the current field so the tab command moves the focus to the next input
                this.currentField.focus();
            }

            if ([Key.Enter, Key.Tab].includes(key)) {
                this.itemSelect(activeItem);
            }
        }
    }

    /**
     * Simulate a datalist element select event.
     */
    private itemSelect(item: HTMLElement): void {
        if (!this.currentField) {
            return;
        }
        this.currentField.dataset.suggestionUuid = item.id;
        this.currentField.dispatchEvent(new Event('autocomplete:datalist-select'));
        this.remove();
    }
}
