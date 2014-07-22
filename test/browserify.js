var test = require('tape')
  , browserify = require('browserify')
  , vm = require('vm')
  , extend = require('extend')


function bundle(file, expected) {
  test('bundle transform', function (t) {
    t.plan(1)
    var b = browserify()
      b.require(__dirname + '/files/' + file, { expose: file })
      b.transform(__dirname + '/..')
      b.bundle(function (err, src) {
        if (err) return t.fail(err)
        src += '\ntest(require(\'' + file + '\'))'
        vm.runInNewContext(src, {
          test: function (result) {
            // just look at the request options (not the function)
            result = extend(true, {}, result)
            t.deepEqual(result, expected)
          }
        })
      })
  })
}

bundle('1.curl', {
    data: ''
  , url: 'http://example.com/'
  , options: {
      headers: {}
    , method: 'GET'
  }
})

bundle('2.curl', {
    data: 'foo=bar'
  , url: 'http://example.com/'
  , options: {
      headers: {
        'content-length': 7
      }
    , method: 'POST'
  }
})

bundle('3.curl', {
    data: 'foo=bar'
  , url: 'http://example.com/'
  , options: {
      headers: {
        'content-length': 7
      }
    , method: 'POST'
  }
})
