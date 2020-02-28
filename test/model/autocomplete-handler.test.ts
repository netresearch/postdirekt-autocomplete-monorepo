import ServiceFactory from 'postdirekt-autocomplete/src/service/service-factory';
import autocomplete from '../../src/postdirekt-autocomplete-lib';
import FormTemplateProvider from '../provider/form-template-provider';
import AddressDataProvider from '../provider/address-data-provider';
import MockSearchService from '../mock/search-service.mock';
import MockSelectService from '../mock/select-service.mock';

const mockSearchService = new MockSearchService(AddressDataProvider.getData());
const mockCreateSearchService = jest.fn(() => mockSearchService);
const mockSelectService = new MockSelectService();
const mockCreateSelectService = jest.fn(() => mockSelectService);
jest.mock('postdirekt-autocomplete/src/service/service-factory',
    () => jest.fn(
        () => (
            {
                createSearchService: mockCreateSearchService,
                createSelectService: mockCreateSelectService,
            }
        ),
    ));
jest.useFakeTimers();

const mockServiceFactory = ServiceFactory as unknown as jest.Mock<ServiceFactory>;
mockServiceFactory.createSearchService = mockCreateSearchService;
mockServiceFactory.createSelectService = mockCreateSelectService;

describe('Simulate search and see if results are rendered into a datalist', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = FormTemplateProvider.getForm();
        mockSearchService.search.mockClear();
        mockSelectService.select.mockClear();
    });

    it('Test that a search is not triggered', () => {
        const streetInput = document.getElementById(`${FormTemplateProvider.getStreetSelector()}`) as HTMLInputElement;
        const cityInput = document.getElementById(`${FormTemplateProvider.getCitySelector()}`) as HTMLInputElement;
        const postCodeInput = document.getElementById(`${FormTemplateProvider.getPostalCodeSelector()}`) as HTMLInputElement;
        const countryInput = document.getElementById(`${FormTemplateProvider.getCountrySelector()}`) as HTMLInputElement;
        countryInput.value = 'SomeThingElse';

        autocomplete.init(
            streetInput,
            cityInput,
            postCodeInput,
            countryInput,
            FormTemplateProvider.getCountryValue(),
            'token',
        );
        streetInput.value = 'abc';
        streetInput.focus();
        ['a', 'b', 'c'].forEach(
            (key: string) => streetInput.dispatchEvent(new KeyboardEvent('keyup', { key })),
        );
        // Run delayedCallbacks immediately
        jest.runOnlyPendingTimers();
        expect(mockSearchService.search).toHaveBeenCalledTimes(0);
        expect(mockSelectService.select).toHaveBeenCalledTimes(0);
        // wait for everything to properly be rendered
        setTimeout(
            () => expect(typeof streetInput.nextElementSibling)
                .not.toMatch(typeof HTMLUListElement),
            600,
        );
    });

    it('Test that a searchresult is being rendered', () => {
        const streetInput = document.getElementById(`${FormTemplateProvider.getStreetSelector()}`) as HTMLInputElement;
        const cityInput = document.getElementById(`${FormTemplateProvider.getCitySelector()}`) as HTMLInputElement;
        const postCodeInput = document.getElementById(`${FormTemplateProvider.getPostalCodeSelector()}`) as HTMLInputElement;
        const countryInput = document.getElementById(`${FormTemplateProvider.getCountrySelector()}`) as HTMLInputElement;
        countryInput.value = FormTemplateProvider.getCountryValue();

        autocomplete.init(
            streetInput,
            cityInput,
            postCodeInput,
            countryInput,
            FormTemplateProvider.getCountryValue(),
            'token',
        );
        streetInput.value = 'abc';
        streetInput.focus();
        ['a', 'b', 'c'].forEach(
            (key: string) => streetInput.dispatchEvent(new KeyboardEvent('keyup', { key })),
        );
        // Run delayedCallbacks immediately
        jest.runOnlyPendingTimers();
        expect(mockSearchService.search).toHaveBeenCalledTimes(1);
        expect(mockSelectService.select).toHaveBeenCalledTimes(0);
        // wait for everything to properly be rendered
        setTimeout(
            () => expect(streetInput.nextElementSibling.childElementCount)
                .toBe(AddressDataProvider.getData().length),
            600,
        );
    });

    it('Test that a selections is being performed by key', () => {
        const streetInput = document.getElementById(`${FormTemplateProvider.getStreetSelector()}`) as HTMLInputElement;
        const cityInput = document.getElementById(`${FormTemplateProvider.getCitySelector()}`) as HTMLInputElement;
        const postCodeInput = document.getElementById(`${FormTemplateProvider.getPostalCodeSelector()}`) as HTMLInputElement;
        const countryInput = document.getElementById(`${FormTemplateProvider.getCountrySelector()}`) as HTMLInputElement;
        countryInput.value = FormTemplateProvider.getCountryValue();

        autocomplete.init(
            streetInput,
            cityInput,
            postCodeInput,
            countryInput,
            FormTemplateProvider.getCountryValue(),
            'token',
        );
        streetInput.value = 'abc';
        streetInput.focus();
        ['a', 'b', 'c'].forEach(
            (key: string) => streetInput.dispatchEvent(new KeyboardEvent('keyup', { key })),
        );
        // Run delayedCallbacks immediately
        jest.runOnlyPendingTimers();
        expect(mockSearchService.search).toHaveBeenCalledTimes(1);
        expect(mockSelectService.select).toHaveBeenCalledTimes(0);
        // wait for everything to properly be rendered
        setTimeout(
            () => {
                expect(streetInput.nextElementSibling.childElementCount)
                    .toBe(AddressDataProvider.getData().length);
                [...Array(3).keys()].map(
                    () => streetInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' })),
                );
                streetInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab' }));
                const address = AddressDataProvider.getData()[2];
                expect(mockSearchService.search).toHaveBeenCalledTimes(1);
                expect(mockSelectService.select).toHaveBeenCalledTimes(1);
                expect(streetInput.value).toEqual(address.street);
                expect(cityInput.value).toEqual(address.city);
                expect(postCodeInput.value).toEqual(address.postalCode);
            },
            600,
        );
    });
});
