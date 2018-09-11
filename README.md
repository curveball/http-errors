HTTP Errors
===========

This package contains a list of standard HTTP exceptions for Typescript. They
can be emitted from a Node.js web application written in for example [Koa][2]
or [Curveball][1], or they can be re-used in a HTTP client.

This package exists because I often find myself re-writing errors such as:

```typescript
class NotFound extends Error {
  const httpStatus = 404;
}
```

Instead of doing this over an over again for every project, it made more sense
to be to create 1 generic package that I can re-use for every project I'm
working on.

Installation
------------

    npm install @curveball/http-errors


Getting started
---------------

...

API
---

...

[1]: https://github.com/curveballjs/
[2]: http://koajs.com/
