/* @flow */

import { it } from 'jasmine-fix'
import getPackageInfo from '../'

describe('package-info', function() {
  it('rejects with correct code when a module has been unpublished', async function() {
    try {
      await getPackageInfo('asdasd')
      expect(false).toBe(true)
    } catch (error) {
      expect(error.code).toBe('MODULE_UNPUBLISHED')
    }
  })
  it('rejects with correct code when a module is not found', async function() {
    try {
      await getPackageInfo('wubbalubbadibdoob')
      expect(false).toBe(true)
    } catch (error) {
      expect(error.code).toBe('MODULE_NOT_FOUND')
    }
  })
  it('merges the latest version info into return value', async function() {
    const distInfo = await getPackageInfo('php-serialize')
    expect(distInfo.author.name).toBe('steelbrain')
  })
  it('keeps a version property with all valid version', async function() {
    const distInfo = await getPackageInfo('php-serialize')
    expect(distInfo.versions['1.2.4'].author.name).toBe('steelbrain')
    expect(distInfo.versions['1.2.0'].author.name).toBe('steelbrain')
    expect(distInfo.versions['0.0.1'].author.name).toBe('steelbrain')
  })
  it('keeps a dist-tags property as returned by the registry', async function() {
    const distInfo = await getPackageInfo('php-serialize')
    expect(distInfo['dist-tags'].latest).toBe(distInfo.version)
  })
})
