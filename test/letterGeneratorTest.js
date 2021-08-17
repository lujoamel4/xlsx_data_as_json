/* global it, describe */
const { nextLetterString } = require('../src/letterGenerator')
const assert = require('assert')

describe('letter generator test', function () {
  it('should return the letters of alphabet', function () {
    const expected = [
      'A', 'B', 'C', 'D', 'E', 'F',
      'G', 'H', 'I', 'J', 'K', 'L',
      'M', 'N', 'O', 'P', 'Q', 'R',
      'S', 'T', 'U', 'V', 'W', 'X',
      'Y', 'Z'
    ]
    const result = []
    let ls = ''
    for (let i = 0; i < 26; i++) {
      ls = nextLetterString(ls)
      result.push(ls)
    }
    for (let i = 0; i < 26; i++) {
      assert.strictEqual(expected[i], result[i])
    }
  })

  it('border test case', function () {
    assert.strictEqual('BA', nextLetterString('AZ'))
    assert.strictEqual('CA', nextLetterString('BZ'))
    assert.strictEqual('AAA', nextLetterString('ZZ'))
  })

  it('should a list of next letter string', function () {
    const expected = [
      'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
      'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z',
      'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ',
      'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT',
      'AU', 'AV', 'AW', 'AX', 'AY', 'AZ',
      'BA', 'BB', 'BC', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ',
      'BK', 'BL', 'BM', 'BN', 'BO', 'BP', 'BQ', 'BR', 'BS', 'BT',
      'BU', 'BV', 'BW', 'BX', 'BY', 'BZ',
      'CA', 'CB', 'CC', 'CD', 'CE', 'CF', 'CG', 'CH', 'CI', 'CJ',
      'CK', 'CL', 'CM', 'CN', 'CO', 'CP', 'CQ', 'CR', 'CS', 'CT',
      'CU', 'CV', 'CW', 'CX', 'CY', 'CZ'
    ]
    const result = []
    let ls = ''
    for (let i = 0; i < 104; i++) {
      ls = nextLetterString(ls)
      result.push(ls)
    }
    for (let i = 0; i < 103; i++) {
      assert.strictEqual(expected[i], result[i])
    }
  })
})
