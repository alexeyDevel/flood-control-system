import { api } from "../config";

export interface IStart {
  ngdu: string;
  field: string;
  area: string;
  bl: string;
  strat: string;
}

export const start = async (params: IStart): Promise<{ message: string }> => {
  return await api
    .post("app/start", {
      json: params,
    })
    .json();
};
