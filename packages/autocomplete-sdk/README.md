# Deutsche Post Direkt DATAFACTORY Autocomplete 2.0 API SDK

## Installation
User facing documentation

## SDK Developer and Contribution Workflow

### Prerequisites

#### Node.js

Before you can start working on the Autocomplete JS SDK, you need to have Node.js
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
by running the following at the root of the SDK:

```bash
$ yarn
```

Once you have installed all the dependencies, you can build the entire SDK by
running the following command the root of the SDK:

```bash
$ yarn build
```

## Usage Example

### In browser
```javascript
import { SearchSubjects, createSearchService } from 'dist/lib/postdirekt-autocomplete';

let searchService = createSearchService('myApiAccessToken')
let requestBuilder = searchService.requestBuilder;
let request = requestBuilder.create({
  country: 'de',
  subject: Subject.Buildings,
  city: 'Test city',
  street: 'Test street'
});

let responsePromise = searchService.search(request);
responsePromise.then(response => { /* handle response */ })
```

### In node

Running in node currently is only possible with a `fetch` polyfill
 (e.g. [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch)).
 A native implementation might follow in the future.

```javascript
require('es6-promise').polyfill();
require('isomorphic-fetch');
const sdk = require('./dist/browser/postdirekt-autocomplete.umd');
let process = require('process');

const token = process.env.TOKEN;

const searchService = sdk.createSearchService(token);

const request = searchService.requestBuilder.create({
  country: 'de',
  street: 'Be',
  city: 'Leipzig',
  subject: sdk.SearchSubjects.PostalCodesCitiesStreets,


});

searchService.search(request).then(
  (response) => {
    console.table(response.addresses)
  }
).catch(
  console.error
);

```

## Testing the SDK

### Running the Tests

You can run the tests with the command

```bash
$ yarn test
```

You can also run the tests everytime you change a file with 

```bash
$ yarn test:watch
```

To run the linter and the test suite, do

```bash
$ yarn test:prod
```
