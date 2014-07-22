var curlifyPath = require.resolve('./lib/curlify')

module.exports = function (file) {
  file = file.trim()

  if (isCurlCommand(file)) {
    return require(curlifyPath)(file)
  }

  var through = require('through')

  if (!/\.curl$/i.test(file)) {
    return through()
  }

  var command = ''

  return through(
    function (chunk) {
      command += chunk
    },
    function () {
      var moduleBody = 'module.exports = (require(' + JSON.stringify(__dirname) + '))(' + JSON.stringify(command) + ')'
      this.queue(moduleBody)
      this.queue(null)
    }
  )
}

function isCurlCommand(str) {
  return /^curl\s+/.test(str)
}
