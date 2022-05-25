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

Instead of doing this over an over again for every client and server-sideproject,
it made more sense to be to create 1 generic package that I can re-use for every
project I'm working on.

I had trouble finding something similar on NPM, so I hope this is useful to
others.

This package has 0 dependencies and is not a part of any frameworks. Someone
could use this package and integrate it into their own frameworks as a
middleware.

The hope is that as long as this package is independent, it could be used by
library authors to throw generic errors with HTTP error information.


Installation
------------

    npm install @curveball/http-errors


Getting started
---------------

After installing the NPM package, you can very easily reference all the
exceptions contained within:

```typescript
import { NotFound, Forbidden } from '@curveball/http-errors';

throw new NotFound('Article not found');
```

This also works fine with plain javascript:

```javascript
const { NotFound, Forbidden } = require('@curveball/http-errors');
throw new Forbidden('You\'re not allowed to update this article');
```


The library also ships with a simple utility function to see if _any_ error has
HTTP error information:

```typescript
import { isHttpError } from '@curveball/http-errors';

const myError = new Error('Custom error');
myError.httpStatus = 500;

console.log(isHttpError(myError));
```

The idea is that as long as libraries follow this pattern, they don't need to
depend on this library but they can be used automatically by middlewares.


Built-in Error classes such as `NotFound`, `Unauthorized`, all have a `title`
property with the default HTTP error string.

```typescript
const myError = new MethodNotAllowed('I can\'t believe youi\'ve done this');
console.log(myError.title); // Emits "Method Not Allowed"
```

It also has a utility function to see if something was a Client or Server error:

```typescript
import { BadRequest, isServerError, isClientError } from '@curveball/http-errors';

const myError = new BadRequest('I didn\'t understand it');
console.log(isClientError(e)); // true
console.log(isServerError(e)); // false
```

Lastly, a few HTTP responses require or suggest including extra HTTP headers with
more information about the error. For example, the `405 Method Not Allowed`
response should include an `Allow` header, and the `503 Service Unavailable`
should have a `Retry-After` header. The built-in error classes include support
these:

```typescript
import { MethodNotAllowed, ServiceUnavailable } from '@curveball/http-errors';

try {
  throw new MethodNotAllowed('Not allowed', ['GET', 'PUT']);
} catch (e) {
  console.log(e.allow);
}

try {
  throw new ServiceUnavailable('Not open on sundays', 3600*24);
} catch (e) {
  console.log(e.retryAfter);
}
```

Lastly, it the package has an interface that makes it easier to work with the
`application/problem+json` format, as defined in [RFC7807][3]. The interface
has `type`, `title`, `detail` and `instance` properties, which makes it easier
to write a generic interface that emits this JSON error format.

API
---

```typescript
export function isHttpError(e: Error): e is HttpError;
export function isHttpProblem(e: Error): e is HttpProblem;
export function isClientError(e: Error): boolean;
export function isServerError(e: Error): boolean;

export interface HttpError extends Error {
  httpStatus: number;
}

export interface HttpProblem extends HttpError {

  type: string | null;
  title: string;
  detail: string | null;
  instance: string | null;

}

export class HttpErrorBase extends Error implements HttpProblem {

  type: string | null = null;
  httpStatus: number = 500;
  title: string = 'Internal Server Error';
  detail: string|null = null;
  instance: string | null = null;

  constructor(detail: string|null = null) { }

}

export class BadRequest extends HttpErrorBase { }

type AuthenticateChallenge = string | string[];

export class Unauthorized extends HttpErrorBase {
  wwwAuthenticate: AuthenticateChallenge;
  constructor(detail: string|null = null, wwwAuthenticate?: AuthenticateChallenge) {}
}

export class PaymentRequired extends HttpErrorBase {}
export class Forbidden extends HttpErrorBase {}
export class NotFound extends HttpErrorBase {}

export class MethodNotAllowed extends HttpErrorBase {
  allow: string[]
  constructor(detail: string|null = null, allow?: string[]) {}
}

export class NotAcceptable extends HttpErrorBase {}

export class ProxyAuthenticationRequired extends HttpErrorBase {
  proxyAuthenticate: AuthenticateChallenge;
  constructor(detail: string|null = null, proxyAuthenticate?: AuthenticateChallenge) {}
}

export class RequestTimeout extends HttpErrorBase {}
export class Conflict extends HttpErrorBase {}
export class Gone extends HttpErrorBase {}
export class LengthRequired extends HttpErrorBase {}
export class PreconditionFailed extends HttpErrorBase {}

export class PayloadTooLarge extends HttpErrorBase {
  retryAfter: number | null;
  constructor(detail: string|null = null, retryAfter: number|null = null) {}
}

export class UriTooLong extends HttpErrorBase { }
export class UnsupportedMediaType extends HttpErrorBase {}
export class RangeNotSatisfiable extends HttpErrorBase {}
export class ExpectationFailed extends HttpErrorBase {}
export class MisdirectedRequest extends HttpErrorBase {}
export class UnprocessableEntity extends HttpErrorBase {}
export class Locked extends HttpErrorBase {}
export class FailedDependency extends HttpErrorBase {}
export class TooEarly extends HttpErrorBase {}
export class UpgradeRequired extends HttpErrorBase {}
export class PreconditionRequired extends HttpErrorBase {}

export class TooManyRequests extends HttpErrorBase {
  retryAfter: number | null;
  constructor(detail: string|null = null, retryAfter: number|null = null) {}
}

export class RequestHeaderFieldsTooLarge extends HttpErrorBase {}
export class UnavailableForLegalReasons extends HttpErrorBase {}
export class InternalServerError  extends HttpErrorBase {}
export class NotImplemented extends HttpErrorBase {}
export class BadGateway extends HttpErrorBase {}

export class ServiceUnavailable extends HttpErrorBase {
  retryAfter: number | null;
  constructor(detail: string|null = null, retryAfter: number|null = null) {}
}

export class GatewayTimeout extends HttpErrorBase {}
export class HttpVersionNotSupported extends HttpErrorBase {}
export class VariantAlsoNegotiates extends HttpErrorBase {}
export class UnsufficientStorage extends HttpErrorBase {}
export class LoopDetected extends HttpErrorBase {}
export class NotExtended extends HttpErrorBase {}
export class NetworkAuthenticationRequired extends HttpErrorBase {}
```

...

[1]: https://github.com/curveball/
[2]: http://koajs.com/
[3]: https://tools.ietf.org/html/rfc7807
