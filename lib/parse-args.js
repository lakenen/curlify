var argify = require('spawn-args')
  , clean = require('./clean-command')

module.exports = function parseArgs(str) {
  str = clean(str)

  // filter out empty args
  return argify(str).filter(Boolean)
}
