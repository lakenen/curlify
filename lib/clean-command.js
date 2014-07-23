
module.exports = function clean(str) {
  // trim whitespace
  str = str.trim()

  // remove comments
  str = str.split(/\n/).map(function (s) {
    return s.replace(/#.*/g, '')
  }).join('\n')

  return str.trim()
}
