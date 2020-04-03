# Postdirekt Autocomplete Metapackage

This package is a monorepo for the _@netresearch/postdirekt-autocomplete-library_ and _@netresearch/postdirekt-autocomplete-sdk_ npm package.
## SDK Developer and Contribution Workflow

### Prerequisites

#### Node.js

Before you can start working on the Autocomplete monorepo, you need to have Node.js
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
by running the following at the root of the repo:

```bash
$ yarn
```

Once you have installed all the dependencies, you can build both packages by
running the following command the root of the repo:

```bash
$ yarn build
```

## Packages

### packages/autocomplete-sdk

This folder contains the _@netresearch/postdirekt-autocomplete-sdk_, responsible for abstracting away the Deutsche Post Direkt Autocomplete 2.0 API.

See [Readme](packages/autocomplete-sdk/README.md).

### packages/autocomplete-library

This folder contains the _@netresearch/postdirekt-autocomplete-library, responsible for registering input listeners on given input fields (street address, city and postcode) and fetching address suggestions from the Autocomplete API via the autocomplete-sdk package.

See [Readme](packages/autocomplete-library/README.md).

## Testing the packages

### Running the Tests

You can run the tests with the command

```bash
$ yarn test
```

To run the linter, do

```bash
$ yarn lint
```

## Building the packages

You can build ES2017 compatible artifacts (this is what's published on npm) with

```bash
$ yarn build
```

You can also build ES5 compatible artifacts (output in `<rootDir>/dist`) with

```bash
$ yarn build:es5
```