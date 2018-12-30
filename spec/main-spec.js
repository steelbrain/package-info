// @flow

import test from 'ava'
import getPackageInfo from '..'

test('rejects with correct code when a module has been unpublished', async function(t) {
  try {
    await getPackageInfo('asdasd')
    t.fail()
  } catch (error) {
    t.is(error.code, 'MODULE_UNPUBLISHED')
  }
})
test('rejects with correct code when a module is not found', async function(t) {
  try {
    await getPackageInfo('wubbalubbadibdoob')
    t.fail()
  } catch (error) {
    t.is(error.code, 'MODULE_NOT_FOUND')
  }
})
test('merges the latest version info into return value', async function(t) {
  const distInfo = await getPackageInfo('php-serialize')
  t.is(distInfo.author.name, 'steelbrain')
})
test('keeps a version property with all valid version', async function(t) {
  const distInfo = await getPackageInfo('php-serialize')
  t.is(distInfo.versions['1.2.4'].author.name, 'steelbrain')
  t.is(distInfo.versions['1.2.0'].author.name, 'steelbrain')
  t.is(distInfo.versions['0.0.1'].author.name, 'steelbrain')
})
test('keeps a dist-tags property as returned by the registry', async function(t) {
  const distInfo = await getPackageInfo('php-serialize')
  t.is(distInfo['dist-tags'].latest, distInfo.version)
})
