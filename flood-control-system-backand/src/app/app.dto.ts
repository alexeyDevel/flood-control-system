import { IsString, IsNotEmpty } from 'class-validator';
import { IStart } from './app.type';

export class StartDto implements IStart {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  horizon: string;

  @IsString()
  @IsNotEmpty()
  block: string;
}
