import { IsString, IsNotEmpty } from 'class-validator';
import { IStart } from './app.type';

export class StartDto implements IStart {
  @IsString()
  @IsNotEmpty()
  ngdu: string;

  @IsString()
  @IsNotEmpty()
  field: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  bl: string;

  @IsString()
  @IsNotEmpty()
  strat: string;
}
