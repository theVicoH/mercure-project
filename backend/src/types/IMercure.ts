export interface IMercure {
  publish: <T>(topic: string, data: T, jwt: string) => void;
}
