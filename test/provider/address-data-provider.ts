import AddressData from '../../src/api/address-data';

export default class AddressDataProvider {
    public static getData(): AddressData[] {
        return [
            {
                uuid: '7AECC9AE52D6F507687F1A0B60AEB462',
                postalCode: '04229',
                city: 'Leipzig',
                street: 'Naumburger Str.',
                addressType: 'A',
            },
            {
                uuid: '6BB5A9C291994471796079B3FD32F9AD',
                postalCode: '04229',
                city: 'Leipzig',
                street: 'Neue Str.',
                addressType: 'A',
            },
            {
                uuid: '0BBA23D57F59886CB253DDC32BF12C7D',
                postalCode: '04229',
                city: 'Leipzig',
                street: 'Nonnenstr.',
                addressType: 'A',
            },
            {
                uuid: '316A0A69B9DC532F60F109CE1C9FE582',
                postalCode: '04229',
                city: 'Leipzig',
                street: 'Nonnenweg',
                addressType: 'A',
            },
        ];
    }
}
