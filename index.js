var argify = require('spawn-args')
  , minimist = require('minimist')
  , request = require('hyperquest')
  , extend = require('extend')
  , unquote = require('unquote')
  , appendQuery = require('append-query')

module.exports = function (str) {
  var argv = minimist(argify(str))
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
        addOption('method', argv[k])
        break
    }
  })

  if (data && options.method === 'GET') {
    url = appendQuery(url, data)
    data = ''
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
    var req = request(url, opt)

    if (data) {
      req.setHeader('content-length', data.length)
      req.end(data)
    }
    return req
  }
}
