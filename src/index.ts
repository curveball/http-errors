export interface HttpError extends Error {
  httpStatus: number;
}

export interface HttpProblem extends HttpError {

  type: string | null;
  title: string;
  detail: string | null;
  instance: string | null;

}

export function isHttpError(e: Error): e is HttpError {

  return Number.isInteger((<HttpError> e).httpStatus);

}
export function isHttpProblem(e: Error): e is HttpProblem {

  return (<HttpProblem> e).title !== undefined && isHttpError(e);

}

export class HttpErrorBase extends Error implements HttpProblem {

  type: string | null = null;
  httpStatus: number = 500;
  title: string = 'Internal Server Error';
  detail: string|null = null;
  instance: string | null = null;

  constructor(detail: string|null = null) {

    super(detail || 'HTTP error');
    this.detail = detail;

  }

}

export function isClientError(e: Error): boolean {

  return isHttpError(e) && e.httpStatus >= 400 && e.httpStatus <= 499;

}

export function isServerError(e: Error): boolean {

  return isHttpError(e) && e.httpStatus >= 500 && e.httpStatus <= 599;

}

export class BadRequest extends HttpErrorBase {
  httpStatus = 400;
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

  httpStatus = 401;
  title = 'Unauthorized';

  wwwAuthenticate?: AuthenticateChallenge;

  constructor(detail: string|null = null, wwwAuthenticate?: AuthenticateChallenge) {

    super(detail);
    this.wwwAuthenticate = wwwAuthenticate;

  }

}

/**
 * Emits 402 Payment Required
 */
export class PaymentRequired extends HttpErrorBase {
  httpStatus = 402;
  title = 'Payment Required';
}

/**
 * Emits 403 Forbidden
 */
export class Forbidden extends HttpErrorBase {
  httpStatus = 403;
  title = 'Forbiddden';
}

/**
 * Emits 404 Not Found
 */
export class NotFound extends HttpErrorBase {
  httpStatus = 404;
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
  httpStatus = 405;
  title = 'Method Not Allowed';
  allow?: string[];

  constructor(detail: string|null = null, allow?: string[]) {

    super(detail);
    this.allow = allow;

  }

}

/**
 * Emits 406 Not Acceptable
 */
export class NotAcceptable extends HttpErrorBase {
  httpStatus = 406;
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

  httpStatus = 407;
  title = 'Proxy Authentication Required';

  proxyAuthenticate?: AuthenticateChallenge;

  constructor(detail: string|null = null, proxyAuthenticate?: AuthenticateChallenge) {

    super(detail);
    this.proxyAuthenticate = proxyAuthenticate;

  }

}

/**
 * Emits 408 Request Timeout
 */
export class RequestTimeout extends HttpErrorBase {
  httpStatus = 408;
  title = 'Request Timeout';
}

/**
 * Emits 409 Conflict
 */
export class Conflict extends HttpErrorBase {
  httpStatus = 409;
  title = 'Conflict';
}

/**
 * Emits 410 Gone
 */
export class Gone extends HttpErrorBase {
  httpStatus = 410;
  title = 'Gone';
}

/**
 * Emits 411 Length Required
 */
export class LengthRequired extends HttpErrorBase {
  httpStatus = 411;
  title = 'LengthRequired';
}

/**
 * Emits 412 Precondition Failed
 */
export class PreconditionFailed extends HttpErrorBase {
  httpStatus = 412;
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
  httpStatus = 413;
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
  httpStatus = 414;
  title = 'URI Too Long';
}

/**
 * Emits 415 Unsupported Media Type
 */
export class UnsupportedMediaType extends HttpErrorBase {
  httpStatus = 415;
  title = 'Unsupported Media Type';
}

/**
 * Emits 416 Range Not Satisfiable
 */
export class RangeNotSatisfiable extends HttpErrorBase {
  httpStatus = 416;
  title = 'Range Not Satisfiable';
}

/**
 * Emits 417 Expectation Failed
 */
export class ExpectationFailed extends HttpErrorBase {
  httpStatus = 417;
  title = 'Expectation Failed';
}

/**
 * Emits 421 Misdirected Request
 */
export class MisdirectedRequest extends HttpErrorBase {
  httpStatus = 421;
  title = 'Misdirected Request';
}

/**
 * Emits 422 Unprocessable Entity
 */
export class UnprocessableEntity extends HttpErrorBase {
  httpStatus = 422;
  title = 'Unprocessable Entity';
}

/**
 * Emits 423 Locked
 */
export class Locked extends HttpErrorBase {
  httpStatus = 423;
  title = 'Locked';
}

/**
 * Emits 424 FailedDependency
 */
export class FailedDependency extends HttpErrorBase {
  httpStatus = 424;
  title = 'Failed Dependency';
}

/**
 * Emits 425 Too Early
 */
export class TooEarly extends HttpErrorBase {
  httpStatus = 425;
  title = 'Too Early';
}

/**
 * Emits 426 Upgrade Required
 */
export class UpgradeRequired extends HttpErrorBase {
  httpStatus = 426;
  title = 'Upgrade Required';
}

/**
 * Emits 428 Precondition Required
 */
export class PreconditionRequired extends HttpErrorBase {
  httpStatus = 428;
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
  httpStatus = 429;
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
  httpStatus = 431;
  title = 'Request Header Fields Too Large';
}

/**
 * Emits 451 Unavailable For Legal Reasons
 */
export class UnavailableForLegalReasons extends HttpErrorBase {
  httpStatus = 451;
  title = 'Unavailable For Legal Reasons';
}

/**
 * Emits 500 Internal Server Error
 */
export class InternalServerError  extends HttpErrorBase {
  httpStatus = 500;
  title = 'Internal Server Error';
}

/**
 * Emits 501 Not Implemented
 */
export class NotImplemented extends HttpErrorBase {
  httpStatus = 501;
  title = 'Not Implemented';
}

/**
 * Emits 502 Bad Gateway
 */
export class BadGateway extends HttpErrorBase {
  httpStatus = 502;
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
  httpStatus = 503;
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
  httpStatus = 504;
  title = 'Gateway Timeout';
}

/**
 * Emits 505 HTTP Version Not Supported
 */
export class HttpVersionNotSupported extends HttpErrorBase {
  httpStatus = 505;
  title = 'HTTP Version Not Supported';
}

/**
 * Emits 506 Variant Also Negotiates
 */
export class VariantAlsoNegotiates extends HttpErrorBase {
  httpStatus = 506;
  title = 'Variant Also Negotiates';
}

/**
 * Emits 507 Insufficient Storage
 */
export class UnsufficientStorage extends HttpErrorBase {
  httpStatus = 507;
  title = 'Unsufficient Storage';
}

/**
 * Emits 508 Loop Detected
 */
export class LoopDetected extends HttpErrorBase {
  httpStatus = 508;
  title = 'Loop Detected';
}

/**
 * Emits 510 Not Extended
 */
export class NotExtended extends HttpErrorBase {
  httpStatus = 510;
  title = 'Not Extended';
}

/**
 * Emits 511 Network Authentication Required
 */
export class NetworkAuthenticationRequired extends HttpErrorBase {
  httpStatus = 511;
  title = 'Network Authentication Required';
}
