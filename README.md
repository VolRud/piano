# piano-app

Here's a little app with a UI piano with the ability to play and record any order of notes. 

## How to run
In ./server and ./client folders
- `npm install`
- `npm start`

## Linting

This repo contains a basic linting setup using [eslint](https://eslint.org/) and [prettier](https://prettier.io/).
You can setup your editor to show (and auto-fix on save) linting errors, e.g. using the [VS Code ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

You can also run:
- `npm run eslint` to show linting errors
- `npm run eslint-fix` to auto-fix linting errors

## React Apollo

The app contains a base configuration for `react-apollo` to use [Queries](https://www.apollographql.com/docs/react/essentials/queries/) and [Mutations](https://www.apollographql.com/docs/react/essentials/mutations/).