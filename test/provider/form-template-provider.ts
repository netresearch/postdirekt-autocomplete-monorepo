import fs from 'fs';

export default class FormTemplateProvider {
    public static getForm(): string {
        return fs.readFileSync(`${__dirname}/form.html`).toString();
    }

    public static getCitySelector(): string {
        return 'city';
    }

    public static getStreetSelector(): string {
        return 'street';
    }

    public static getPostalCodeSelector(): string {
        return 'postcode';
    }

    public static getCountrySelector(): string {
        return 'country';
    }

    public static getCountryValue(): string {
        return 'DE';
    }
}
