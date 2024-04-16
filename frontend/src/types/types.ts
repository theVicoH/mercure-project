export interface AuthState {
  jwt: string | undefined;
  expiration: number | undefined;
}

export interface UserId {
  id: number | undefined;
}

export interface SendMessageRequestBody {
  conversationId: number;
  message: string;
}

export interface AddFriendRequestBody {
  friendUsername: string;
}

export interface Notifcation {
  id: number;
  conversationId: number;
  username: string;
  photo: {
    type: 'Buffer';
    data: number[];
  };
  message: string;
}
