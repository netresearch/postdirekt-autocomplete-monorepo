import AddressData from '../../src/api/address-data';
import AddressDataProvider from '../provider/address-data-provider';
import AutocompleteAddressSuggestions from '../../src/model/autocomplete-address-suggestions';

describe('Test for Autocomplete suggestions', () => {
    it('properly set and return of suggestion item', () => {
        const expected: AddressData = {
            uuid: '0BBA23D57F59886CB253DDC32BF12C7D',
            postalCode: '04229',
            city: 'Leipzig',
            street: 'Nonnenstr.',
            addressType: 'A',
        };
        const subject = new AutocompleteAddressSuggestions();
        subject.suggestions = AddressDataProvider.getData();
        const result = subject.getByUuid('0BBA23D57F59886CB253DDC32BF12C7D');
        expect(result).toEqual(expected);
    });
});
