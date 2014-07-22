# curlify

Generate a node HTTP(S) request from [cURL](http://curl.haxx.se/) command line arguments.

## Usage

Example
```js
var curlify = require('curlify')
// generate a request method from this cURL command string
var request = curlify('curl -X POST -H "content-type: application/json" -d \'{"foo": "bar"}\' http://example.com')
// make an http POST with the specified headers and data
request().pipe(process.stdout)
```


## Browserify

The curlify module can be used as a [browserify](https://github.com/substack/node-browserify) transform for cURL commands saved as files with the `.curl` extension.

The module will default to being a browserify transform if the given argument does not look like a cURL command (i.e., it doesn't start with `'curl '`).

`command.curl`
```
curl http://example.com/ -X POST -d "some=data"
```

```js
var b = browserify()
b.add('command.curl')
b.transform('curlify')
b.bundle()
```

## License

([The MIT License](LICENSE))

Copyright 2014 Cameron Lakenen
