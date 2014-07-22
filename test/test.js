var test = require('tape')
  , curlify = require('..')

test('should generate proper request url', function (t) {
  t.plan(1)
  var req = curlify('curl http://example.com/')
  t.equal(req.url, 'http://example.com/', 'should be equal')
})

test('should generate proper request url with added data', function (t) {
  t.plan(1)
  var req = curlify('curl http://example.com/ -d "hello=world"')
  t.equal(req.url, 'http://example.com/?hello=world', 'should be equal')
})

test('should generate proper request url when method is POST with added data', function (t) {
  t.plan(3)
  var req = curlify('curl -X POST http://example.com/ -d "hello=world"')
  t.equal(req.url, 'http://example.com/', 'should be equal')
  t.equal(req.data, 'hello=world', 'should be equal')
  t.equal(req.options.method, 'POST', 'should be POST')
})

test('should generate proper request headers when a header is added', function (t) {
  t.plan(1)
  var req = curlify('curl http://example.com/ -H "content-type:application/json"')
  t.deepEqual(req.options.headers, { 'content-type': 'application/json' }, 'should be equal')
})

test('should generate proper request headers when multiple headers are added', function (t) {
  t.plan(1)
  var req = curlify('curl http://example.com/ -H "content-type:application/json" -H "authorization:token beepboopbop"')
  var expected = {
      'content-type': 'application/json'
    , 'authorization': 'token beepboopbop'
  }
  t.deepEqual(req.options.headers, expected, 'should be equal')
})
