const isGibberish = require('./')

test('Should return undefined if nothing was given', () => {
  expect(isGibberish()).toBeUndefined()
})

test('Should throw if `options.exclude` is not an array', () => {
  expect(() => {
    isGibberish('foo', { exclude: 'foo' })
  }).toThrow()
})

test('Should know if an English language word if not gibberish', () => {
  expect(isGibberish('Hello')).toBeFalsy()
})

test('Should know if an other lang word is not gibberish', () => {
  expect(isGibberish('Makkara')).toBeFalsy()
})

test('Should know if a clearly nonsense string is gibberish', () => {
  expect(isGibberish('9988egj4')).toBeTruthy()
})

test('Should exclude a string', () => {
  expect(isGibberish('9988egj4 lolnoob', { exclude: ['lolnoob'] })).toBeFalsy()
})

test('Should return the score instead of a boolean if so specified', () => {
  expect(isGibberish('lolnoob', { returnScore: true })).toBe(0.091)
})

test('The sensitivity setting should work', () => {
  expect(
    isGibberish('lolnoob', {
      // The returned score here is 0.091, the dial is pretty sensitive.
      sensitivity: 0.09
    })
  ).toBeFalsy()

  expect(
    isGibberish('lolnoob', {
      sensitivity: 0.92
    })
  ).toBeTruthy()
})
