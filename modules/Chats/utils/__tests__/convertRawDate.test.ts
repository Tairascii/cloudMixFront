import { describe, expect, it } from '@jest/globals'
import { convertRawDate } from '../convertRawDate'

describe('convertRawDate', () => {
  it('should correctly covert raw date into format HH:MM', () => {
    const test = convertRawDate('2023-11-26T15:36:21.408Z')
    expect(test).toEqual('21:36')
  })

  it('should return empty string if date is not passed', () => {
    const test = convertRawDate('')
    expect(test).toEqual('')
  })
})
