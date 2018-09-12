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

type WwwAuthenticate = string | string[];

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

  wwwAuthenticate: WwwAuthenticate;

  constructor(detail: string|null = null, wwwAuthenticate?: WwwAuthenticate) {

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
