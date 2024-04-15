export enum HttpResponseCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,

  MovedPermanently = 301,
  Found = 302,
  NotModified = 304,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,

  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTimeout = 504,
}

export interface SuccessResponse<T = undefined> {
  code: HttpResponseCode;
  body: T extends undefined
    ? {
        message: string;
      }
    : {
        message: string;
        data: T;
      };
}

export interface ErrorResponse {
  code: HttpResponseCode;
  body: {
    message: string;
  };
}

export type ApiResponse<T = undefined> = SuccessResponse<T> | ErrorResponse;

export interface LoginResponse {
  jwt: string;
  expiration: number;
}

export interface ConversationListResponse {
  id: number;
  friendUsername: string;
  friendPhoto: {
    type: 'Buffer';
    data: ArrayBuffer;
  };
  message: string;
  messageSentAt: string;
  numberOfUnreadMessages: string;
}

export interface MessageResponse {
  id: number;
  conversationId: number;
  senderId: number;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface UserInfoResponse {
  id: number;
  username: string;
  photo: {
    type: 'Buffer';
    data: ArrayBuffer;
  };
  createdAt: string;
}
