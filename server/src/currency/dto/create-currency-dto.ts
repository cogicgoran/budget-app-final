import { Transform } from 'class-transformer';
import { IsAlpha, IsString, Length } from 'class-validator';

export class CreateCurrencyDto {
  @Transform((e) => e.value.toUpperCase())
  @IsAlpha('en-GB', { message: 'English alphabet letter allowed only' })
  @Length(3, 3, {
    message: (e) =>
      `Bad currency code length(${e.constraints[0]} characters only)`,
  })
  @IsString({ message: 'Invalid currency code' })
  code: string;
}
