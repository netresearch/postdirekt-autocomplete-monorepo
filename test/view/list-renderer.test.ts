import AddressData from '../../src/api/address-data';
import Key from '../../src/model/key-types';
import ListRenderer from '../../src/view/list-renderer';
import FormTemplateProvider from '../provider/form-template-provider';
import AddressDataProvider from '../provider/address-data-provider';

describe('Test Autocomplete list render', () => {
    document.body.innerHTML = FormTemplateProvider.getForm();
    const inputId = `#datalist-${FormTemplateProvider.getPostalCodeSelector()}`;
    const suggestions: AddressData[] = AddressDataProvider.getData();

    it('test rendering with keyboard selcection', () => {
        const input: HTMLInputElement = document.querySelector(`input[name="${FormTemplateProvider.getPostalCodeSelector()}"]`) as HTMLInputElement;
        const renderer: ListRenderer = new ListRenderer();
        const cb = jest.fn();
        input.addEventListener('autocomplete:datalist-select', cb);
        renderer.render(input, suggestions);

        const list: HTMLElement | null = document.querySelector(inputId);
        if (list != null) {
            expect(list.childElementCount).toEqual(4);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: Key.ArrowDown }));
            const listChildren = list.querySelectorAll('li');

            if (listChildren != null) {
                const first = listChildren.item(0);
                expect(first.getAttribute('data-active')).toEqual('true');
                input.dispatchEvent(new KeyboardEvent('keydown', { key: Key.Enter }));
                const result = document.querySelector(inputId);
                expect(result).toBe(null);
                expect(cb).toHaveBeenCalled();
            }
        }
    });

    it('test rendering with mouse selection', () => {
        const input: HTMLInputElement = document.querySelector(`input[name="${FormTemplateProvider.getPostalCodeSelector()}"]`) as HTMLInputElement;
        const renderer: ListRenderer = new ListRenderer();
        const cb = jest.fn();
        input.addEventListener('autocomplete:datalist-select', cb);
        renderer.render(input, suggestions);
        const list: HTMLElement | null = document.querySelector(inputId);
        if (list != null) {
            expect(list.childElementCount).toEqual(4);
            list.dispatchEvent(new Event('mousedown'));
            const result = document.querySelector(inputId);
            expect(result).toBe(null);
            expect(cb).toHaveBeenCalled();
        }
    });

    it('test rendering with tab action', () => {
        const input: HTMLInputElement = document.querySelector(`input[name="${FormTemplateProvider.getPostalCodeSelector()}"]`) as HTMLInputElement;
        const renderer: ListRenderer = new ListRenderer();
        const cb = jest.fn();
        input.addEventListener('autocomplete:datalist-select', cb);
        renderer.render(input, suggestions);
        const list: HTMLElement | null = document.querySelector(inputId);
        if (list != null) {
            expect(list.childElementCount).toEqual(4);
            input.dispatchEvent(new KeyboardEvent('keydown', { key: Key.ArrowDown }));
            input.dispatchEvent(new KeyboardEvent('keydown', { key: Key.ArrowDown }));
            input.dispatchEvent(new KeyboardEvent('keydown', { key: Key.ArrowUp }));
            const listChildren = list.querySelectorAll('li');

            if (listChildren != null) {
                const activeItem = listChildren.item(0);
                expect(activeItem.getAttribute('data-active')).toEqual('true');
                input.dispatchEvent(new KeyboardEvent('keydown', { key: Key.Tab }));
                const result = document.querySelector(inputId);
                expect(result).toBe(null);
                expect(cb).toHaveBeenCalled();
            }
        }
    });
});
