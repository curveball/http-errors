import { expect } from 'chai';
import * as err from '../src';

describe('isHttpError', () => {

  it('should return true for any error object that has a httpStatus property', () => {

    const foo = new Error('hi');
    (<any> foo).httpStatus = 404;
    expect(err.isHttpError(foo)).to.equal(true);

  });

  it('should return false for other error objects', () => {

    const foo = new Error('hi');
    expect(err.isHttpError(foo)).to.equal(false);

  });

});

describe('isHttpProblem', () => {

  it('should return true for any error object that has a title', () => {

    const foo = new Error('hi');
    (<any> foo).title = 'hello';
    (<any> foo).httpStatus = 404;
    expect(err.isHttpProblem(foo)).to.equal(true);

  });

  it('should return false for other error objects', () => {

    const foo = new Error('hi');
    (<any> foo).httpStatus = 404;
    expect(err.isHttpProblem(foo)).to.equal(false);

  });

});

describe('isClientError', () => {

  it('should return true for any error code between 400 and 499 inclusive', () => {

    const foo = new Error('hi');
    (<any> foo).httpStatus = 404;
    expect(err.isClientError(foo)).to.equal(true);

  });

  it('should return false for other codes', () => {

    const foo = new Error('hi');
    (<any> foo).httpStatus = 500;
    expect(err.isClientError(foo)).to.equal(false);

  });

});

describe('isServerError', () => {

  it('should return true for any error code between 500 and 599 inclusive', () => {

    const foo = new Error('hi');
    (<any> foo).httpStatus = 501;
    expect(err.isServerError(foo)).to.equal(true);

  });

  it('should return false for other codes', () => {

    const foo = new Error('hi');
    (<any> foo).httpStatus = 499;
    expect(err.isServerError(foo)).to.equal(false);

  });

});

describe('HTTP Exceptions', () => {

  const classes = [
    err.BadRequest,
    err.Unauthorized,
    err.PaymentRequired,
    err.Forbidden,
    err.NotFound,
    err.MethodNotAllowed,
    err.NotAcceptable,
    err.ProxyAuthenticationRequired,
    err.RequestTimeout,
    err.Conflict,
    err.Gone,
    err.LengthRequired,
    err.PreconditionFailed,
    err.PayloadTooLarge,
    err.UriTooLong,
    err.UnsupportedMediaType,
    err.RangeNotSatisfiable,
    err.ExpectationFailed,
    err.MisdirectedRequest,
    err.UnprocessableEntity,
    err.Locked,
    err.FailedDependency,
    err.TooEarly,
    err.UpgradeRequired,
    err.PreconditionRequired,
    err.TooManyRequests,
    err.RequestHeaderFieldsTooLarge,
    err.UnavailableForLegalReasons,
    err.InternalServerError,
    err.NotImplemented,
    err.BadGateway,
    err.ServiceUnavailable,
    err.GatewayTimeout,
    err.HttpVersionNotSupported,
    err.VariantAlsoNegotiates,
    err.UnsufficientStorage,
    err.LoopDetected,
    err.NotExtended,
    err.NetworkAuthenticationRequired,
  ];

  for (const clss of classes) {

    describe(clss.name, () => {

      it('should be instantiatable', () => {

        const obj = new clss('Detail');
        expect(obj.detail).to.eql('Detail');
        expect(err.isHttpError(obj)).to.eql(true);
        expect(err.isHttpProblem(obj)).to.eql(true);
        expect(typeof obj.title).to.eql('string');
        expect(obj.message).to.equal(obj.detail);

      });

      const code = (new clss()).httpStatus;

      switch (<any> code) {

        case 401:
          it('should respect the wwwAuthenticate parameter', () => {
            const obj2 = new (<any> clss)('Foo', 'Bearer');
            expect(obj2.wwwAuthenticate).to.equal('Bearer');
          });
          break;
        case 405:
          it('should respect the allow parameter', () => {
            const obj2 = new (<any> clss)('Foo', ['GET', 'POST']);
            expect(obj2.allow).to.eql(['GET', 'POST']);
          });
          break;
        case 407:
          it('should respect the proxyAuthenticate parameter', () => {
            const obj2 = new (<any> clss)('Foo', 'Bearer');
            expect(obj2.proxyAuthenticate).to.equal('Bearer');
          });
          break;
        case 413:
        case 429:
        case 503:
          it('should respect the retryAfter parameter', () => {
            const obj2 = new (<any> clss)('Foo', 600);
            expect(obj2.retryAfter).to.equal(600);
          });
          break;

      }

    });

  }

});
