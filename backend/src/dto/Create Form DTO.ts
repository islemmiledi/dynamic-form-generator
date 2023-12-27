
import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';



export class CreateFormDto {
  @IsString()
  name: string;

  @IsArray()
  data: [];
}
