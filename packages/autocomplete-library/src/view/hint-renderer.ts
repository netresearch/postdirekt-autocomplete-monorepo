/**
 * See LICENSE.md for license details.
 */

export default class HintRenderer {
    private infoBox?: HTMLElement;

    private hintText: string;

    constructor(hintText: string) {
        this.hintText = hintText;
    }

    public render(inputElement: HTMLInputElement): void {
        if (!inputElement.parentElement) {
            throw Error('Input elements without a parent cannot be assigned a infobox.');
        }
        if (this.hintText.length === 0) {
            return;
        }

        const hintBox = document.createElement('div');
        const hint = document.createElement('span');
        hintBox.setAttribute('class', 'autocomplete-infoBox');
        hintBox.setAttribute('id', 'autocomplete-hint');
        hint.innerHTML = this.hintText;
        hintBox.appendChild(hint);
        this.infoBox = hintBox;
        inputElement.parentElement.appendChild(hintBox);
    }

    public remove(): void {
        if (this.infoBox) {
            const removal = document.getElementById('autocomplete-hint');
            if (removal && removal.parentNode) {
                removal.parentNode.removeChild(removal);
                this.infoBox = undefined;
            }
        }
    }
}
