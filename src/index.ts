export class HttpError extends Error {
  httpCode: number = 500;
  title: string = 'Internal Server Error';
  detail: string|null = null

  constructor(detail: string|null = null) {

    super(detail);
    if (!detail) {
      this.message = this.title;
    }
    this.detail = detail;

  }

}

export interface ClientError {
}

export interface ServerError {
}

export class BadRequest extends HttpError implements ClientError {
  httpCode = 400;
  title = 'Bad Request';
}


export class NotFound extends HttpError implements ClientError {
  httpCode = 404;
  title = 'Not Found';
}

export class MethodNotAllowed extends HttpError implements ClientError {
  httpCode = 405;
  title = 'Method Not Allowed';
}

export class InternalServerError  extends HttpError implements ServerError {
  httpCode = 500;
  title = 'Internal Server Error';
}

export class NotImplemented extends HttpError implements ServerError {
  httpCode = 501;
  title = 'Not Implemented';
}
