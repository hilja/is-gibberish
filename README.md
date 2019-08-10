# Is Gibberish

This package finds out if a string is real language or just nonsense. it returns a boolean, and you can tweak its sensitivity or exclude certain words.

## What is it good for?

It might be good for:

- Checking which files have human readable names.
- Checking if a string is good to be used as a title for an entry.
- Comparing two dodgy strings and seeing which is better.

## Examples

Simple example:

```js
const isGibberish = require('is-gibberish')

console.log(isGibberish('Hello there!'))
// false

console.log(isGibberish('asfafasfasfafg'))
// true
```

Here's a more advanced example that finds filenames that make no sense:

```js
const isGibberish = require('is-gibberish')
// Get your data, this can be anything, in this case it happens to be a large
//array filenames.
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

console.log(JSON.stringify(badFilenames, null, 2))
console.log(
  `There is a total of ${filenames.length} filenames
of which ${badFilenames.length} is gibberish`
)
```

You can find the above example from the [`examples`](./examples) dir of this repo. If you want to play with it, just clone this repo and run `npm run example`.

By default it returns a boolean, but it can be configured to return the score, also, if some more advanced comparing is needed:

```js
const isGibberish = require('is-gibberish')

const OPTIONS = { returnScore: true }
const string1 = isGibberish('lolnoob', OPTIONS)
const string2 = isGibberish('lolwut', OPTIONS)

console.log('`string1` makes this much sense:', string1)
console.log('and `string2` this much:', string2)
```

## API

### isGibberish(input[, options])

Returns: `boolean|number`

**input**

Type: `string`

**options.exclude**

Type: `array`

Exclude from analysis and always return `false`. These are the exceptions that you know are _not_ real words, but you’d still like to classify as real words.

**options.sensitivity**

Type: `number`<br>
Default: `0.111`

How sensitive the match is. Lower the number, the more forgiving it is. Through quasi experimental research done in my research laboratory, I'd say 0.111 is good value to start with.

## How does it work?

This is just a thin convenience wrapper around [`languagedetect`](https://www.npmjs.com/package/languagedetect) package.
