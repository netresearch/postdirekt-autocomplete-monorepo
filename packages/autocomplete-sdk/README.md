# Deutsche Post Direkt DATAFACTORY Autocomplete 2.0 API SDK

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
