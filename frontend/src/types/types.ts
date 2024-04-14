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
