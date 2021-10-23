<div>
  <a href="https://angular.io/">
    <img style="display: inline-block" src="https://angular.io/assets/images/logos/angular/angular.svg" width="128" height="128">
  </a>
  <a href="http://typeorm.io/">
    <img style="display: inline-block" src="https://github.com/typeorm/typeorm/raw/master/resources/logo_big.png" width="292" height="128">
  </a>
   <a href="https://electronjs.org/">
    <img style="display: inline-block" src="https://electronjs.org/images/electron-logo.svg" width="292" height="128">
  </a>
  <br>
</div>

# file-metadata

## Quickstart

```bash
npm install
npm start
```

## Description

A simple cross platform file navigator that lets you add and search by arbitrary file metadata.

## Features

- Cross platform: macOS, Linux, Windows
- Rich text metadata
- Search
- Auto attach metadata to duplicate files
- Safe - your files are never modified. All metadata is stored in a separate SQLite database.
- i18n

## Downloads

Binary builds for all supported platforms can be found in the [release](TODO:link).

## Screenshots

TODO: add

## Build Commands

| Command                    | Description                                                                                                 |
| -------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `npm run build`            | Build the app. Your built files are in the /dist folder.                                                    |
| `npm run build:prod`       | Build the app with Angular aot. Your built files are in the /dist folder.                                   |
| `npm run electron:linux`   | Builds your application and creates an app consumable on linux system                                       |
| `npm run electron:windows` | On a Windows OS, builds your application and creates an app consumable in windows 32/64 bit systems         |
| `npm run electron:mac`     | On a MAC OS, builds your application and generates a `.app` file of your application that can be run on Mac |

## Planned

- [ ] Import/export button
- [ ] More complex search options
- [ ] Caching & better performance on humongous flat folders
- [ ] Allow annotation of folders
- [ ] Appearance customization & user settings (eg. specify sampling size, quantity and hashing function)

## Thanks

Many thanks to [CubikNeRubik](https://github.com/CubikNeRubik/angular-electron-typeorm-starter.git) for the electron-starter boilerplate.
