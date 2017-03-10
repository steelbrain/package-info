Package-Info
===========

Package Info is an npm module to get details about any package published on the npm registry.

## Installation

```
npm install --save sb-package-info
```

## API

```js
type PackageInfo = {
  name: string,
  version: string,
  description: string,
  scripts: Object,
  dependencies: Object,
  devDependencies: Object,

  versions: Object,
  'dist-tags': Object,
}

export default async function getPackageInfo(name: string, registryPrefix: ?string = null): Promise<PackageInfo>
```

## Usage

```
import getPackageInfo from 'sb-package-info'

getPackageInfo('asdasd').catch(function(error) {
  console.log(error.code) // MODULE_UNPUBLISHED
})
getPackageInfo('some-non-existent-module').catch(function(error) {
  console.log(error.code) // MODULE_NOT_FOUND
})
getPackageInfo('php-serialize').then(function(contents) {
  console.log('name', contents.name)
  console.log('version', contents.version)
  console.log('author', contents.author.name)
  console.log('versions', Object.keys(contents.version))
})

```

## License
This project is licensed under the terms of MIT License. See the License file for more info.
