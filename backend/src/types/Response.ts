export enum HttpResponseCode {
  // Success
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  // Redirection
  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  // Client Error
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,

  // Server Error
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export interface SuccessResponse {
  code: HttpResponseCode;
  body: unknown;
}

export interface ErrorResponse {
  code: HttpResponseCode;
  body: {
    message: string;
  };
}

export type ResponseController = SuccessResponse | ErrorResponse;
