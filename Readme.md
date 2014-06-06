###Hiboris
[![build status](https://secure.travis-ci.org/rootslab/hiboris.png?branch=master)](http://travis-ci.org/rootslab/hiboris) 
[![NPM version](https://badge.fury.io/js/hiboris.png)](http://badge.fury.io/js/hiboris)

[![NPM](https://nodei.co/npm/hiboris.png?downloads=true&stars=true)](https://nodei.co/npm/hiboris/)

[![NPM](https://nodei.co/npm-dl/hiboris.png)](https://nodei.co/npm/hiboris/)

> **_Hiboris_**, a utility module to load __[hiredis](https://github.com/redis/hiredis-node) native parser__, or to fall back to __[Boris](https://github.com/rootslab/boris), a __pure JS parser__.

###Install

```bash
$ npm install hiboris [-g]
// clone repo
$ git clone git@github.com:rootslab/hiboris.git
```

> __require__:

```javascript
var Hiboris  = require( 'hiboris' );
```

###Run Tests

```bash
$ cd hiboris/
$ npm test
```

###Constructor

> Create an instance, the argument within [ ] is optional.

```javascript
/*
 * NOTE: if hiredis module is not available, it falls back
 * to use pure JS parser, and returns an instance of Boris.
 */
Hiboris( [ Object opt ] ) : Hiboris | Boris
// or
new Hiboris( [ Object opt ] ) : Hiboris | Boris
```
####Options

> Default options are listed.

```javascript
opt = {
    /*
     * For default the hiredis native parser is disabled.
    */
    hiredis : false
}
```

###Sample Usage

> See [examples](example/).

###Methods

> Arguments within [ ] are optional.

```javascript
/*
 * parse a chunk of data.
 */
Hiboris#parse( Buffer data ) : undefined

/*
 * reset parser state.
 */
Hiboris#reset() : undefined

```

###Events

```javascript
/*
 * Parser has found some data.
 * 
 * NOTE: The 'convert' function argument is a shortcut to Bolgia#reveal
 * utility, it scans an array and turns all Buffers into Strings or Numbers.
 *
 * NOTE: the boolean 'isError' signals a Redis error reply, not a runtime Error.
 */
'match' : function ( Boolean isError, Array result, Function convert ) : undefined

/*
 * A parse error occurred.
 *
 * NOTE: on error, parser state will be reset.
 */
'error' : function ( String emsg ) : undefined
```

------------------------------------------------------------------------


### MIT License

> Copyright (c) 2014 &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.