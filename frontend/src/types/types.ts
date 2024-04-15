export interface AuthState {
  jwt: string | undefined;
  expiration: number | undefined;
}

export interface UserProfilInfo {
  id: number | undefined;
  username: string | undefined;
  photo: string | undefined;
  createdAt: string | undefined;
}

export interface SendMessageRequestBody {
  conversationId: number
  message: string
}

export interface AddFriendRequestBody {
  friendUsername: string
}