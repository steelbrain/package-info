/* @flow */

export type PackageInfo = {
  name: string,
  version: string,
  description: string,
  scripts: Object,
  dependencies: Object,
  devDependencies: Object,

  versions: Object,
  'dist-tags': Object,
}
