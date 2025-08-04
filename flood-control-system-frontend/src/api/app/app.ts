import { api } from "../config";

export enum CalculationTypeEnum {
  LIQUID_PRODUCTION, // "Расчёты по добываемой жидкости",
  BOTTOMHOLE_PRESSURE, // "Расчёты по забойному давлению"
}

export interface IOptimize {
  ngdu: string;
  field: string;
  area: string;
  bl: string;
  strat: string;
  calculationType: CalculationTypeEnum;
}

export type TNfluence = IOptimize;

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

export const influence = async (
  params: TNfluence
): Promise<{ message: string; pid: string }> => {
  return await api
    .post("app/influence", {
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
