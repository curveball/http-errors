Changelog
=========

1.0.1 (????-??-??)
------------------

* Remove dependency on @curveball/kernel


1.0.0 (2024-01-15)
------------------

* Finally! Curveball v1. Only took 6 years.
* CommonJS support has been dropped. The previous version of this library
  supported both CommonJS and ESM. The effort of this no longer feels worth it.
  ESM is the future, so we're dropping CommonJS.
* Now requires Node 18.
* Upgraded to Typescript 5.3.
* To match RFC9110, `UnprocessableEntity` is now `UnprocessableContent`, and
  `PayloadToolarge` is now `ContentTooLarge`. The old classes still exist and
  have been marked as deprecated.
* Updated references from RFC7807 to RFC9457.


0.5.0 (2023-02-14)
------------------

* This package now supports ESM and CommonJS modules.
* No longer supports Node 14.


0.4.1 (2022-01-15)
------------------

* `isHttpError` and `isHttpProblem` can now take any (unknown) type as
  arguments, making it easier to use these functions without casting.
* `Forbiddden` -> `Forbidden`.
* Update everything to latest curveball defaults.
* Update all dependencies.


0.4.0 (2021-02-18)
------------------

* Update everything to latest curveball standards.
* Publish on github packages


0.3.0 (2018-10-01)
------------------

* Mass-renamed httpCode to the more common httpStatus.
* Added all missing status codes.
* Fully unittested.


0.2.2 (2018-09-14)
------------------

* Added `isHttpProblem()` helper function.
* Added 408, 409, 410, 411, 412, 413.


0.2.1 (2018-09-14)
------------------

* The `allow` parameter from `MethodNotAllowed` is now optional.
* Added 406, 407, 422.


0.2.0 (2018-09-12)
------------------

* Added `Unauthorized`, `PaymentRequired`, `Forbidden`.
* Added support for `WWW-Authenticate` header for 401 responses and `Allow` for
  405 responses.


0.1.0 (2018-09-11)
------------------

* Dropped `ClientError` and `ServerError` interfaces, they aren't useful in TS.
* Added `HttpError` and `HttpProblem` interfaces.
* Added `isHttpError` type guard.
* Added `isClientError` and `isServerError` helpers.


0.0.1 (2018-09-11)
------------------

* First version with just a few errors to test the ergonomics of this package.
