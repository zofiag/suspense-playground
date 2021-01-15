import { IResponse } from "./types";

export const getData = (): Promise<IResponse> =>
  new Promise((resolve) => {
    setTimeout(() => resolve({ name: "John" }), 3000);
  });
