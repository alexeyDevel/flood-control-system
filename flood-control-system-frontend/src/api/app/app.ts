import { api } from "../config";

export interface IOptimize {
  ngdu: string;
  field: string;
  area: string;
  bl: string;
  strat: string;
}

export const optimize = async (
  params: IOptimize
): Promise<{ message: string; pid: string }> => {
  return await api
    .post("app/optimize", {
      json: params,
    })
    .json();
};
