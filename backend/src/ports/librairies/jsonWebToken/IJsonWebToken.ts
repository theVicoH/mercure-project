export default interface IJsonWebToken {
  signToken: (id: number, expirationDate: number) => string;
}
