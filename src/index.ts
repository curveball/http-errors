export interface HttpError extends Error {
  httpCode: number;
}

export interface HttpProblem extends HttpError {

  type: string | null;
  title: string;
  detail: string | null;
  instance: string | null;

}

export function isHttpError(e: Error): e is HttpError {

  return Number.isInteger((<HttpError> e).httpCode);

}
export function isHttpProblem(e: Error): e is HttpProblem {

  return (<HttpProblem> e).title !== undefined && isHttpError(e);

}

export class HttpErrorBase extends Error implements HttpProblem {

  type: string | null = null;
  httpCode: number = 500;
  title: string = 'Internal Server Error';
  detail: string|null = null;
  instance: string | null = null;

  constructor(detail: string|null = null) {

    super(detail);
    this.detail = detail;
    this.message = detail;

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
 * Emits 414 URI Too Long
 */
export class UriTooLong extends HttpErrorBase {
  httpCode = 414;
  title = 'URI Too Long';
}

/**
 * Emits 415 Unsupported Media Type
 */
export class UnsupportedMediaType extends HttpErrorBase {
  httpCode = 415;
  title = 'Unsupported Media Type';
}

/**
 * Emits 416 Range Not Satisfiable
 */
export class RangeNotSatisfiable extends HttpErrorBase {
  httpCode = 416;
  title = 'Range Not Satisfiable';
}

/**
 * Emits 417 Expectation Failed
 */
export class ExpectationFailed extends HttpErrorBase {
  httpCode = 417;
  title = 'Expectation Failed';
}

/**
 * Emits 421 Misdirected Request
 */
export class MisdirectedRequest extends HttpErrorBase {
  httpCode = 421;
  title = 'Misdirected Request';
}

/**
 * Emits 422 Unprocessable Entity
 */
export class UnprocessableEntity extends HttpErrorBase {
  httpCode = 422;
  title = 'Unprocessable Entity';
}

/**
 * Emits 423 Locked
 */
export class Locked extends HttpErrorBase {
  httpCode = 423;
  title = 'Locked';
}

/**
 * Emits 424 FailedDependency
 */
export class FailedDependency extends HttpErrorBase {
  httpCode = 424;
  title = 'Failed Dependency';
}

/**
 * Emits 425 Too Early
 */
export class TooEarly extends HttpErrorBase {
  httpCode = 425;
  title = 'Too Early';
}

/**
 * Emits 426 Upgrade Required
 */
export class UpgradeRequired extends HttpErrorBase {
  httpCode = 426;
  title = 'Upgrade Required';
}

/**
 * Emits 428 Precondition Required
 */
export class PreconditionRequired extends HttpErrorBase {
  httpCode = 428;
  title = 'Precondition Required';
}

/**
 * Emits 429 Too Many Requests
 *
 * When sending this status the server may also send a Retry-After header
 * indicating when it's safe try again.
 *
 * It's possible to supply this information via the second argument.
 *
 * Example:
 *   throw new ServiceUnavailable('We\'re down temporarily', 600)
 *
 */
export class TooManyRequests extends HttpErrorBase {
  httpCode = 429;
  title = 'Too Many Requests';

  retryAfter: number | null;

  constructor(detail: string|null = null, retryAfter: number|null = null) {

    super(detail);
    this.retryAfter = retryAfter;

  }
}

/**
 * Emits 431 Request Header Fields Too Large
 */
export class RequestHeaderFieldsTooLarge extends HttpErrorBase {
  httpCode = 431;
  title = 'Request Header Fields Too Large';
}

/**
 * Emits 451 Unavailable For Legal Reasons
 */
export class UnavailableForLegalReasons extends HttpErrorBase {
  httpCode = 451;
  title = 'Unavailable For Legal Reasons';
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

/**
 * Emits 502 Bad Gateway
 */
export class BadGateway extends HttpErrorBase {
  httpCode = 502;
  title = 'Bad Gateway';
}

/**
 * Emits 503 Service Unavailable.
 *
 * When sending this status the server may also send a Retry-After header
 * indicating when it's safe try again.
 *
 * It's possible to supply this information via the second argument.
 *
 * Example:
 *   throw new ServiceUnavailable('We\'re down temporarily', 600)
 *
 */
export class ServiceUnavailable extends HttpErrorBase {
  httpCode = 503;
  title = 'Service Unavailable';

  retryAfter: number | null;

  constructor(detail: string|null = null, retryAfter: number|null = null) {

    super(detail);
    this.retryAfter = retryAfter;

  }
}

/**
 * Emits 504 Gateway Timeout
 */
export class GatewayTimeout extends HttpErrorBase {
  httpCode = 504;
  title = 'Gateway Timeout';
}

/**
 * Emits 505 HTTP Version Not Supported
 */
export class HttpVersionNotSupported extends HttpErrorBase {
  httpCode = 505;
  title = 'HTTP Version Not Supported';
}

/**
 * Emits 506 Variant Also Negotiates
 */
export class VariantAlsoNegotiates extends HttpErrorBase {
  httpCode = 506;
  title = 'Variant Also Negotiates';
}

/**
 * Emits 507 Insufficient Storage
 */
export class UnsufficientStorage extends HttpErrorBase {
  httpCode = 507;
  title = 'Unsufficient Storage';
}

/**
 * Emits 508 Loop Detected
 */
export class LoopDetected extends HttpErrorBase {
  httpCode = 508;
  title = 'Loop Detected';
}

/**
 * Emits 510 Not Extended
 */
export class NotExtended extends HttpErrorBase {
  httpCode = 510;
  title = 'Not Extended';
}

/**
 * Emits 511 Network Authentication Required
 */
export class NetworkAuthenticationRequired extends HttpErrorBase {
  httpCode = 511;
  title = 'Network Authentication Required';
}
