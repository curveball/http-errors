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


export class NotFound extends HttpErrorBase {
  httpCode = 404;
  title = 'Not Found';
}

export class MethodNotAllowed extends HttpErrorBase {
  httpCode = 405;
  title = 'Method Not Allowed';
}

export class InternalServerError  extends HttpErrorBase {
  httpCode = 500;
  title = 'Internal Server Error';
}

export class NotImplemented extends HttpErrorBase {
  httpCode = 501;
  title = 'Not Implemented';
}
