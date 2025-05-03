import { api } from "../config";

export interface IOptimize {
  ngdu: string;
  field: string;
  area: string;
  bl: string;
  strat: string;
}

export interface IUploadForecast {
  fileName: string;
  fileData: string;
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

export const forecast = async (
  params: IUploadForecast
): Promise<{ message: string; pid: string }> => {
  return await api
    .post("app/forecast", {
      json: params,
    })
    .json();
};
