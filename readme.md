# Github dashboard

[![Build Status](https://travis-ci.org/udebella/Github-dashboard.svg?branch=master)](https://travis-ci.org/udebella/Github-dashboard)

## Contributing

## Install dependencies

The first time, you checkout the project, you will need to use npm to install dependencies

```bash
# nvm use
# npm ci
```

## Running tests

To run tests, you need to
```bash
# npm test
```

You can also pass arguments to that command to run tests continuously (by default it will run once)
```bash
# npm test -- --watch
```

It will automatically generate a coverage report in `/coverage` repository

## Running the project locally

To run the project, you need to 
```bash
# npm start
```

It will automatically open your browser.

## Building the project

The project can be build with the following command
```bash
# npm run build
```

It will generate the bundle in `/dist` repository. Inside there will be `stats.json` file that can be
exploited with the following command line :
```bash
# npm run bundle-analyzer
```

That [tool](https://www.npmjs.com/package/webpack-bundle-analyzer) allows you to check the size of the bundle generated 
and which dependency makes the size explode.

## Deploying

When commits lands on master branch, [travis](https://travis-ci.org/udebella/Github-dashboard) will automatically launch 
a build that will deploy to github-pages when completed.

## Generating component

To generate component, [plop](https://github.com/amwmedia/plop) has been added :
```bash
# npm run plop
```

It will ask for the component name, and will generate a folder with base files to work with.

--

*Every given path is from project directory 
