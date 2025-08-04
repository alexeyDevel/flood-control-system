import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { CalculationTypeEnum, IStart } from './app.type';

export class StartDto implements Omit<IStart, 'userId'> {
  @IsEnum(CalculationTypeEnum, {
    message: `"Тип расчетов" должен быть одним из вариантов`,
  })
  @IsNotEmpty({ message: `"Тип расчетов" не может быть пустым` })
  calculationType: CalculationTypeEnum;

  @IsString({ message: `"НГДУ" должно быть строкой` })
  @IsNotEmpty({ message: `"НГДУ" не может быть пустым` })
  ngdu: string;

  @IsString({ message: `"Месторождение" должно быть строкой` })
  @IsNotEmpty({ message: `"Месторождение" не может быть пустым` })
  field: string;

  @IsString({ message: `"Участок" должна быть строкой` })
  @IsNotEmpty({ message: `"Участок" не может быть пустым` })
  area: string;

  @IsString({ message: `"Блок" должно быть строкой` })
  @IsNotEmpty({ message: `"Блок" не может быть пустым` })
  bl: string;

  @IsString({ message: `"Горизонт" должна быть строкой` })
  @IsNotEmpty({ message: `"Горизонт" не может быть пустым` })
  strat: string;
}
