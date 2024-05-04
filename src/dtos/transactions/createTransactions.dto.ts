import { IsDate, IsDecimal, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateTransactionsDto {
  @IsString()
  readonly description: string;

  @IsDecimal({ decimal_digits: '2' })
  readonly value: number;

  @IsString()
  readonly category: string;

  @IsString()
  readonly type: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  readonly date: Date;
}
