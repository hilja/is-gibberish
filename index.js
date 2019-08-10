const LanguageDetect = require('languagedetect')
const average = require('average')

const detectLanguage = new LanguageDetect()

/**
 * Checks if a string is nonsense, not any language.
 *
 * @param {string} string The string to check.
 * @param {object} options The options object.
 * @param {array} options.exclude Array of words that might look like nonsense, but are not.
 * @param {number} options.sensitivity How sensitive the match should be.
 * @param {boolean} options.returnScore Should the score be returned, instead of boolean.
 */
const isGibberish = (input, options) => {
  if (!input) return

  const simplifyNumber = x => parseFloat(parseFloat(x).toFixed(3))
  const DEFAULTS = {
    exclude: [],
    returnScore: false,
    // Through quasi experimental research done in my research laboratory, I'd
    // say 0.111 is good value to start with. Lower the number, the more
    // forgiving the filter is.
    sensitivity: 0.111
  }
  const OPTIONS = { ...DEFAULTS, ...options }

  if (!Array.isArray(OPTIONS.exclude)) {
    throw new Error('options.exclude should be an array.')
  }

  const detectedLanguage = detectLanguage.detect(input)
  const isExcluded = OPTIONS.exclude.some(x => new RegExp(x, 'gi').test(input))

  // If there's no result what-so-ever, then it’s probably gibberish.
  if (!detectedLanguage.length > 0) return true

  // If it's excluded by the user, then definitely it’s not gibberish.
  if (isExcluded) return false

  const languageScores = detectedLanguage.slice(0, 3).map(item => item[1])
  const averageScore = simplifyNumber(average(languageScores))

  return OPTIONS.returnScore
    ? averageScore
    : averageScore < simplifyNumber(OPTIONS.sensitivity)
}

module.exports = isGibberish
