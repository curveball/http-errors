export interface HttpError extends Error {
  httpCode: number;
}

export interface HttpProblem extends HttpError {

  title: string;
  detail: string | null;

}

export function isHttpError(e: Error): e is HttpError {

  return Number.isInteger((<HttpError> e).httpCode);

}
export function isHttpProblem(e: Error): e is HttpProblem {

  return (<HttpProblem> e).title !== undefined && isHttpError(e);

}

export class HttpErrorBase extends Error implements HttpProblem {

  httpCode: number = 500;
  title: string = 'Internal Server Error';
  detail: string|null = null;

  constructor(detail: string|null = null) {

    super(detail);
    if (!detail) {
      this.message = this.title;
    }
    this.detail = detail;

  }

}

export function isClientError(e: Error): boolean {

  return isHttpError(e) && e.httpCode >= 400 && e.httpCode <= 499;

}

export function isServerError(e: Error): boolean {

  return isHttpError(e) && e.httpCode >= 500 && e.httpCode <= 599;

}

export class BadRequest extends HttpErrorBase {
  httpCode = 400;
  title = 'Bad Request';
}

type AuthenticateChallenge = string | string[];

/**
 * Emits a 401 Unauthorized.
 *
 * This response must come with a WWW-Authenticate header. This challenge can
 * optionally be provided via the constructor.
 *
 * examples:
 *    new Unauthorized('Login failed', 'Basic');
 *    new Unauthorized('Login failed', 'Basic; realm="secret area"');
 *    new Unauthorized('Login failed', ['Basic; realm="secret area', 'Bearer']);
 */
export class Unauthorized extends HttpErrorBase {

  httpCode = 401;
  title = 'Unauthorized';

  wwwAuthenticate: AuthenticateChallenge;

  constructor(detail: string|null = null, wwwAuthenticate?: AuthenticateChallenge) {

    super(detail);
    this.wwwAuthenticate = wwwAuthenticate;

  }

}

/**
 * Emits 402 Payment Required
 */
export class PaymentRequired extends HttpErrorBase {
  httpCode = 402;
  title = 'Payment Required';
}

/**
 * Emits 403 Forbidden
 */
export class Forbidden extends HttpErrorBase {
  httpCode = 403;
  title = 'Forbiddden';
}

/**
 * Emits 404 Not Found
 */
export class NotFound extends HttpErrorBase {
  httpCode = 404;
  title = 'Not Found';
}

/**
 * Emits 405 Method Not Allowed.
 *
 * The 405 Method Not Allowed HTTP response requires an Allow header.
 * You can optionally use the second argument to provide this.
 *
 * Example:
 *   new MethodNotAllowed('This resource is read-only', ['GET', 'HEAD', 'OPTIONS']);
 */
export class MethodNotAllowed extends HttpErrorBase {
  httpCode = 405;
  title = 'Method Not Allowed';
  allow: string[];

  constructor(detail: string|null = null, allow?: string[]) {

    super(detail);
    this.allow = allow;

  }

}

/**
 * Emits 406 Not Acceptable
 */
export class NotAcceptable extends HttpErrorBase {
  httpCode = 406;
  title = 'Not Acceptable';
}

/**
 * Emits a 407 Proxy Autentication Required
 *
 * This response must come with a Proxy-Authenticate header. This challenge can
 * optionally be provided via the constructor.
 *
 * examples:
 *    new ProxyAuthenticationRequired('Login failed', 'Basic');
 *    new ProxyAuthenticationRequired('Login failed', 'Basic; realm="secret area"');
 *    new ProxyAuthenticationRequired('Login failed', ['Basic; realm="secret area', 'Bearer']);
 */
export class ProxyAuthenticationRequired extends HttpErrorBase {

  httpCode = 407;
  title = 'Proxy Authentication Required';

  proxyAuthenticate: AuthenticateChallenge;

  constructor(detail: string|null = null, proxyAuthenticate?: AuthenticateChallenge) {

    super(detail);
    this.proxyAuthenticate = proxyAuthenticate;

  }

}

/**
 * Emits 408 Request Timeout
 */
export class RequestTimeout extends HttpErrorBase {
  httpCode = 408;
  title = 'Request Timeout';
}

/**
 * Emits 409 Conflict
 */
export class Conflict extends HttpErrorBase {
  httpCode = 409;
  title = 'Conflict';
}

/**
 * Emits 410 Gone
 */
export class Gone extends HttpErrorBase {
  httpCode = 410;
  title = 'Gone';
}

/**
 * Emits 411 Length Required
 */
export class LengthRequired extends HttpErrorBase {
  httpCode = 411;
  title = 'LengthRequired';
}

/**
 * Emits 412 Precondition Failed
 */
export class PreconditionFailed extends HttpErrorBase {
  httpCode = 412;
  title = 'PreconditionFailed';
}

/**
 * Emits 413 Payload Too Large.
 *
 * If the status is temporary, it's possible for a server to send a
 * Retry-After header to try again. This value may be embeded in this
 * exception.
 *
 * Example:
 *
 * throw new PayloadTooLarge('Send the large file again in 10 minutes', 600);
 */
export class PayloadTooLarge extends HttpErrorBase {
  httpCode = 413;
  title = 'Payload Too Large';

  retryAfter: number | null;

  constructor(detail: string|null = null, retryAfter: number|null = null) {

    super(detail);
    this.retryAfter = retryAfter;

  }
}

/**
 * Emits 422 Unprocessable Entity
 */
export class UnprocessableEntity extends HttpErrorBase {
  httpCode = 422;
  title = 'Unprocessable Entity';
}

/**
 * Emits 500 Internal Server Error
 */
export class InternalServerError  extends HttpErrorBase {
  httpCode = 500;
  title = 'Internal Server Error';
}

/**
 * Emits 501 Not Implemented
 */
export class NotImplemented extends HttpErrorBase {
  httpCode = 501;
  title = 'Not Implemented';
}
