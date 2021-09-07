# Deutsche Post Direkt DATAFACTORY Autocomplete Library

## Manual Installation

1. Pick the format you need from `dist/browser/postdirekt-autocomplete-lib.*.js
2. Move the `.js` file to your project
3. Move the file `dist/browser/styles.css` to your project

## Usage

Include the library `.js` and `.css` on the HTML page where your form is located:

``` html
<head>
    <script type="text/javascript"
            src="path/to/postdirekt-autocomplete-lib.*.js"></script>
    <link rel="stylesheet"
        type="text/css"
        href="path/to/styles.css">
</head>
```

Instantiate the library, passing in the following information:

- the `HTMLInputElement`s for your *street*, *city*, *postal code* and *country* inputs
- the country input value that maps to "Germany"
- a valid DATAFACTORY Autocomplete access token. You can generate a token from PHP with the [PHP Authentication SDK](https://github.com/netresearch?q=autocomplete)

``` js
postdirektAutocompleteLib.init(
        document.querySelector('[id="shipping:street1"]'),
        document.querySelector('[id="shipping:city"]'),
        document.querySelector('[id="shipping:postcode"]'),
        document.querySelector('[name="shipping[country_id]"]'),
        'DE',
        'YOUR_ACCESS_TOKEN',
        'YOUR_HOUSENUMBER_HINT_TEXT'
    );
```
