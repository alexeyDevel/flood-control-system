export enum CalculationTypeEnum {
  LIQUID_PRODUCTION, // "Расчёты по добываемой жидкости",
  BOTTOMHOLE_PRESSURE, // "Расчёты по забойному давлению"
}
export interface IStart {
  ngdu: string;
  field: string;
  area: string;
  bl: string;
  strat: string;
  userId: string;
  calculationType: CalculationTypeEnum;
  radius: string;
}
