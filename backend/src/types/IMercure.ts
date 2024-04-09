export interface IMercure {
  publish: (topic: string, data: unknown, jwt: string) => void;
}
