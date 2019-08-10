const isGibberish = require('../')
const filenames = require('./filenames')

const OPTIONS = {
  // These are totally English, silly robot.
  exclude: ['hmmmmmmmmmm', 'javascript-02', 'lolnoob'],
  // Play with this value to see changes in the returned array.
  sensitivity: 0.111
}

const badFilenames = filenames
  .map(filename => (isGibberish(filename, OPTIONS) ? filename : undefined))
  .filter(Boolean)

// Log the array
// console.log(JSON.stringify(badFilenames, null, 2))
console.log(
  `There is a total of ${filenames.length} filenames
of which ${badFilenames.length} is gibberish`
)
