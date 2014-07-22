# curlify

Transform [cURL](http://curl.haxx.se/) commands into a node function that will make the request specified by cURL command line arguments.

## Usage

Example
```js
var curlify = require('curlify')
// generate a request method from this cURL command string
var request = curlify('curl -X POST -H "content-type: application/json" -d \'{"foo": "bar"}\' http://example.com')
// make an http POST with the specified headers and data
request().pipe(process.stdout)
```


## License

([The MIT License](LICENSE))

Copyright 2014 Cameron Lakenen
