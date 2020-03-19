# Deutsche Post Direkt DATAFACTORY Autocomplete Library

## Manual Installation

1. Generate the compiled JavaScript files via `yarn build` (see "Install Dependencies")
2. Pick the format you need from `dist/browser/postdirekt-autocomplete-lib.*.js
3. Move the `.js` file to your project
4. Move the file `dist/browser/styles.css` to your project

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
        'YOUR_ACCESS_TOKEN'
    );
```

## Developer and Contribution Workflow

### Prerequisites

#### Node.js

Before you can start working on the Post Direkt Autocomplete JS Library, you need to have Node.js
installed on your machine. The currently supported versions are `10.0.0` or greater.

To download Node.js visit https://nodejs.org/en/download/.

_NOTE: You can use a tool like [`NVM`](https://github.com/creationix/nvm)
or [`N`](https://github.com/tj/n) to install and manage multiple node versions_

#### Yarn

In addition to Node.js we use `yarn` to facilitate multi package development.

To install `yarn` follow the instructions listed on their website:
https://yarnpkg.com/en/docs/install

#### Verify Prerequisites

You can verify your setup by running the following commands in your terminal:

```bash
$ node -v
$ yarn -v
```

Your Node.js version should be `10.0.0` or greater, your `yarn` version should
be `1.0.0` or greater,

### Install Dependencies

Once you have Node.js and `yarn` installed on your machine and have validated
that you are running the proper version, you can set up the development environment
by running the following at the root of the Library:

```bash
$ yarn
```

Once you have installed all the dependencies, you can build the entire Library by running the following command the root of the Library:

```bash
$ yarn build
```
