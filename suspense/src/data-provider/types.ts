export interface IContext<T> {
  operations: {
    get: { read: () => T | undefined };
  };
}

export interface IResponse {
  name: string;
}
