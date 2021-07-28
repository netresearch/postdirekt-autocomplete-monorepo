import HintRenderer from '../../src/view/hint-renderer';
import FormTemplateProvider from '../provider/form-template-provider';

describe('Test Autocomplete hint render', () => {
    beforeEach(() => {
        document.body.innerHTML = FormTemplateProvider.getForm();
    });

    it('test rendering', () => {
        const streetElement = document
            .getElementById(FormTemplateProvider.getStreetSelector()) as HTMLInputElement;
        const hintText = 'I am a hint!';
        const renderer: HintRenderer = new HintRenderer(hintText);
        renderer.render(streetElement);
        expect(document.getElementById(FormTemplateProvider.getHintBoxElementId()))
            .toBeInstanceOf(HTMLElement);
    });

    it('test removing', () => {
        const streetElement = document
            .getElementById(FormTemplateProvider.getStreetSelector()) as HTMLInputElement;
        const hintText = 'I am a hint!';
        const renderer: HintRenderer = new HintRenderer(hintText);
        renderer.render(streetElement);
        expect(document.getElementById(FormTemplateProvider.getHintBoxElementId()))
            .toBeInstanceOf(HTMLElement);
        renderer.remove();
        expect(document.getElementById(FormTemplateProvider.getHintBoxElementId()))
            .toBeNull();
    });
});
