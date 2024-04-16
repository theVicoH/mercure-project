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

export interface MessageResponse {
  id: number;
  conversationId: number;
  senderId: number;
  message: string;
  read: boolean;
  createdAt: string;
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


export const messageFeedService = async (
  authToken: string,
  id: number
): Promise<ApiResponse<MessageResponse[]>> => {
  try {
    const response = await fetch(`http://localhost:3000/messages-feed/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
    });
    const responseData: ApiResponse<MessageResponse[]> = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    return responseData;
  } catch (error) {
    return {
      code: HttpResponseCode.InternalServerError,
      body: {
        message: (error as Error).message,
      },
    };
  }
};
