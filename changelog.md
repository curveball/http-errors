0.2.3 (2018-10-01)
=================

* Added all missing status codes.


0.2.2 (2018-09-14)
==================

* Added `isHttpProblem()` helper function.
* Added 408, 409, 410, 411, 412, 413.


0.2.1 (2018-09-14)
==================

* The `allow` parameter from `MethodNotAllowed` is now optional.
* Added 406, 407, 422.


0.2.0 (2018-09-12)
==================

* Added `Unauthorized`, `PaymentRequired`, `Forbidden`.
* Added support for `WWW-Authenticate` header for 401 responses and `Allow`
  for 405 responses.


0.1.0 (2018-09-11)
==================

* Dropped `ClientError` and `ServerError` interfaces, they aren't useful in
  TS.
* Added `HttpError` and `HttpProblem` interfaces.
* Added `isHttpError` type guard.
* Added `isClientError` and `isServerError` helpers.


0.0.1 (2018-09-11)
==================

* First version with just a few errors to test the ergonomics of this package.
