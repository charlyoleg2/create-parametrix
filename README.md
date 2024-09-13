create-parametrix
=================


Presentation
------------

*create-parametrix* is the *initializer* used by *npm* for creating a new [parametrix](https://github.com/charlyoleg2/parametrix) project. It contains the *command line interface* application called by `npm create parametrix@latest`.


Links
-----

- [sources](https://github.com/charlyoleg2/create-parametrix)
- [pkg](https://www.npmjs.com/package/create-parametrix)


Requirements
------------

- [node](https://nodejs.org) > 20.10.0
- [npm](https://docs.npmjs.com/cli) > 10.5.0


Usage
-----

*create-parametrix* is not intended to be installed directly but rather used via one of the following commands:

```bash
npm create parametrix@latest
npm create parametrix@latest Sam08
npm init parametrix@latest Sam08
npm exec create-parametrix@latest Sam08
npx create-parametrix@latest Sam08
```

Dev
---

```bash
git clone https://github.com/charlyoleg2/create-parametrix
cd create-parametrix
npm install
npm run ci
npm run run
```

Upgrade dependencies
--------------------

```bash
npm outdated
npm update --save
git commit -am 'npm update --save'
```
or
```bash
npx npm-check-updates
npx npm-check-updates --upgrade
npm install
git commit -am 'npx npm-check-updates --upgrade'
```

Publish a new release
---------------------

```bash
npm version patch
git push
git push origin v0.5.6
```



