/* @flow */

import got from 'got'
import registryUrl from 'registry-url'
import type { PackageInfo } from './types'

async function getPackageInfo(name: string, registryPrefix: ?string = null): Promise<PackageInfo> {
  if (typeof name !== 'string' || !name) {
    throw new Error('Invalid name provided')
  }
  if (registryPrefix && typeof registryPrefix !== 'string') {
    throw new Error('Invalid registryPrefix provided')
  }

  const manifest = {
    name: '',
    version: '',
    description: '',
    scripts: {},
    dependencies: {},
    devDependencies: {},
    versions: {},
    'dist-tags': {},
  }
  let result
  try {
    result = (await got(`${registryUrl(registryPrefix)}${encodeURIComponent(name)}`, { json: true })).body
  } catch (error) {
    if (error && error.statusCode === 404) {
      throw new Error(`Package '${name}' not found`)
    }
    throw error
  }
  if (result.versions) {
    Object.assign(manifest, result.versions[result['dist-tags'].latest])
    Object.assign(manifest.versions, result.versions)
    Object.assign(manifest['dist-tags'], result['dist-tags'])
  } else {
    throw new Error(`Package '${name}' has been unpublished`)
  }

  return manifest
}

module.exports = getPackageInfo
