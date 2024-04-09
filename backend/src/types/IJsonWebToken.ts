export interface IJsonWebToken {
  signToken: (
    payload: object,
    expirationDate: string,
    expiresIn: number
  ) => string;
}
