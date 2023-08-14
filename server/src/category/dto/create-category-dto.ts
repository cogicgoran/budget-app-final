import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Invalid name' })
  @IsNotEmpty({ message: 'Name must not be empty' })
  @MaxLength(30, {
    message: (e) =>
      `Category name length exceeded(${e.constraints[0]} characters allowed)`,
  })
  name: string;

  @IsString({ message: 'Invalid category icon' })
  @IsNotEmpty({ message: 'Icon must not be empty' })
  @MaxLength(64, {
    message: (e) =>
      `Category icon name length exceeded(${e.constraints[0]} characters allowed)`,
  })
  icon: string;

  @IsString({ message: 'Invalid category color' })
  @IsNotEmpty({ message: 'Color must not be empty' })
  @Length(7, 7, { message: 'Bad color hex value' })
  color: string;
}
