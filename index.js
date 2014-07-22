var argify = require('spawn-args')
  , minimist = require('minimist')
  , request = require('hyperquest')
  , extend = require('extend')

module.exports = function (str) {
  var argv = minimist(argify(str))
    , url = argv._[1]
    , options = {
      headers: {}
    }
    , data = ''

  Object.keys(argv).forEach(function (k) {
    switch (k) {
      case 'H':
        addHeaders(argv[k])
        break
      case 'd':
        addData(argv[k])
        break
      case 'X':
        addOption('method', argv[k])
        break
    }
  })

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
      data = d.reduce(function (x, d) {
        return x + '&' + unquote(d)
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

function unquote(str) {
  var q = /[\'\"]/
  if (q.test(str.charAt(0))) {
    str = str.substr(1)
  }
  if (q.test(str.charAt(str.length - 1))) {
    str = str.substr(0, str.length - 1)
  }
  return str
}
