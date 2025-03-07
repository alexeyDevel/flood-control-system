import { api } from "../config";

interface IStart {
  name: string;
  horizon: string;
  block: string;
}

export const start = async (params: IStart): Promise<{ message: string }> => {
  return await api
    .post("app/start", {
      json: params,
    })
    .json();
};
