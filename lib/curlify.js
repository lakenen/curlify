var parseArgs = require('./parse-args')
  , minimist = require('minimist')
  , extend = require('extend')
  , unquote = require('unquote')
  , appendQuery = require('append-query')

module.exports = function (str) {
  var argv = minimist(parseArgs(str))
    , url = argv._[1]
    , options = {
        method: 'GET'
      , headers: {}
    }
    , data = ''

  Object.keys(argv).forEach(function (k) {
    switch (k) {
      case 'H':
      case 'header':
        addHeaders(argv[k])
        break
      case 'd':
      case 'data':
        addData(argv[k])
        break
      case 'X':
        addOption('method', argv[k].toUpperCase())
        break
    }
  })

  if (data) {
    if (options.method === 'GET') {
      url = appendQuery(url, data)
      data = ''
    } else {
      addHeader(['content-length', data.length])
    }
  }

  var result = function (ur, opt, dat) {
    ur = ur || url
    opt = extend(true, {}, options, opt || {})
    dat = dat || data
    return makeRequest(ur, opt, dat)
  }
  result.url = url
  result.options = options
  result.data = data

  return result

  function addHeaders(harr) {
    if (!Array.isArray(harr)) {
      harr = [harr]
    }
    harr.map(unquote).map(function (h) {
      return h.split(/:\s*/)
    }).forEach(addHeader)
  }

  function addHeader(h) {
    options.headers[h[0]] = h[1]
  }

  function addOption(name, val) {
    options[name] = val
  }

  function addData(d) {
    if (Array.isArray(d)) {
      data = d.map(unquote).reduce(function (a, b) {
        return a + '&' + b
      })
    } else {
      data = unquote(d)
    }
  }

  function makeRequest(url, opt, data) {
    var request = require('hyperquest')
      , req = request(url, opt)

    if (data) {
      req.end(data)
    }
    return req
  }
}
