const assert = require('assert')

const { has_ktp, grab_ktp, grab_all_nomor_ktp, hide_all_nomor_ktp } = require('./regular_expressions.js')

describe('Unit test all the methods', () => {
  it('should test `has_ktp`', () => {
    assert.deepEqual(has_ktp("please don't share this: 234-60-1422"), true)
  })
  it('should test `grab_ktp`', () => {
    assert.deepEqual(grab_ktp('please confirm your identity: XXX-XX-1422'), null)
  })
  it('should test `grab_ktp` that returns true', () => {
    assert.deepEqual(grab_ktp("please don't share this: 234-60-1422"), '234-60-1422')
  })
  it('should test `grab_all_nomor_ktp` that returns true', () => {
    assert.deepEqual(grab_all_nomor_ktp('234-60-1422, 350-80-0744, 013-60-8762'), ["234-60-1422", "350-80-0744", "013-60-8762"])
  })
  it('should test `grab_all_nomor_ktp` that returns empty array', () => {
    assert.deepEqual(grab_all_nomor_ktp('please confirm your identity: XXX-XX-1422'), [])
  })
  it('should test `hide_all_nomor_ktp` obfuscates any nomor KTP in the string', () => {

    assert.deepEqual(hide_all_nomor_ktp('234-60-1422, 350-80-0744, 013-60-8762'), "XXX-XX-1422, XXX-XX-0744, XX-XX-8762")

  })

  it('should test `hide_all_nomor_ktp` does not alter a string without nomor KTP in it', () => {
    assert.deepEqual(hide_all_nomor_ktp('please confirm your identity: XXX-XX-1422'), 'please confirm your identity: XXX-XX-1422')
  })

})
