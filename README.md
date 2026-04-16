# Postdirekt Autocomplete Monorepo

This monorepo contains the _@netresearch/postdirekt-autocomplete-library_ and _@netresearch/postdirekt-autocomplete-sdk_ npm packages.

## Developer and Contribution Workflow

### Prerequisites

#### Node.js

Before you can start working on the Autocomplete monorepo, you need to have Node.js
installed on your machine. The required version is pinned in `.nvmrc` (currently Node 22).

To download Node.js visit https://nodejs.org/en/download/.

_NOTE: You can use a tool like [`NVM`](https://github.com/nvm-sh/nvm)
or [`N`](https://github.com/tj/n) to install and manage multiple node versions.
With NVM, run `nvm install` in the repo root to automatically install and switch to the correct version._

#### Yarn

This project uses [Yarn 4](https://yarnpkg.com/) via Node.js corepack. Enable it with:

```bash
corepack enable
```

Yarn will be automatically resolved from the `packageManager` field in `package.json` -- no separate installation needed.

#### Verify Prerequisites

You can verify your setup by running the following commands in your terminal at the root of the repo:

```bash
node -v
yarn -v
```

Your Node.js version should match `.nvmrc`, and `yarn -v` should show `4.x`.

### Install Dependencies

Once you have Node.js and corepack enabled, set up the development environment
by running the following at the root of the repo:

```bash
yarn
```

Once you have installed all the dependencies, you can build both packages by
running the following command at the root of the repo:

```bash
yarn build
```

## Packages

### packages/autocomplete-sdk

This folder contains the _@netresearch/postdirekt-autocomplete-sdk_, responsible for abstracting away the Deutsche Post Direkt Autocomplete 2.0 API.

See [Readme](packages/autocomplete-sdk/README.md).

### packages/autocomplete-library

This folder contains the _@netresearch/postdirekt-autocomplete-library_, responsible for registering input listeners on given input fields (street address, city and postcode) and fetching address suggestions from the Autocomplete API via the autocomplete-sdk package.

See [Readme](packages/autocomplete-library/README.md).

## Testing the packages

You can run the tests with:

```bash
yarn test
```

To run the linter:

```bash
yarn lint
```

## Building the packages

You can build ES2017 compatible artifacts (this is what's published on npm) with:

```bash
yarn build
```

You can also build ES5 compatible artifacts (output in `<rootDir>/dist`) with:

```bash
yarn build:es5
```
