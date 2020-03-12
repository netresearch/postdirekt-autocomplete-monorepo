import AutocompleteDomAddress from '../../src/model/autocomplete-dom-address';
import AddressInputType from '../../src/api/address-input-types';
import DomAddressData from '../../src/api/dom-address-data';

describe('Test for autocomplete DOM getters and setters', () => {
    it('properly returns the DOMAddressData', () => {
        const city = 'Leipzig';
        const street = 'Nonnenst';
        const postalCode = '123';

        const map = new Map<AddressInputType, HTMLInputElement>([
            [AddressInputType.City, { value: city } as HTMLInputElement],
            [AddressInputType.Street, { value: street } as HTMLInputElement],
            [AddressInputType.PostalCode, { value: postalCode } as HTMLInputElement],
        ]);

        const subject = new AutocompleteDomAddress(map);

        const result = subject.address;

        expect(result.city).toEqual(city);
        expect(result.street).toEqual(street);
        expect(result.postalCode).toEqual(postalCode);
    });

    it('properly sets and returns the DOMAddressData', () => {
        const data: DomAddressData = {
            city: 'Leipzig',
            postalCode: '1234',
            street: 'NoNnEnStR',
        };
        const map = new Map<AddressInputType, HTMLInputElement>([
            [AddressInputType.City, { value: '', dispatchEvent: () => undefined } as unknown as HTMLInputElement],
            [AddressInputType.Street, { value: '', dispatchEvent: () => undefined } as unknown as HTMLInputElement],
            [AddressInputType.PostalCode, { value: '', dispatchEvent: () => undefined } as unknown as HTMLInputElement],
        ]);
        const subject = new AutocompleteDomAddress(map);
        subject.address = data;
        const result = subject.address;

        expect(result.city).toEqual(data.city);
        expect(result.street).toEqual(data.street);
        expect(result.postalCode).toEqual(data.postalCode);
    });
});
