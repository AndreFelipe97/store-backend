import { IsDecimal, IsInt, IsString } from 'class-validator';

export class CreateProductsDto {
  @IsString()
  readonly description: string;
  @IsString()
  readonly brand: string;
  @IsDecimal({ decimal_digits: '2' })
  readonly price: number;
  @IsInt()
  readonly amount: number;
  @IsString()
  readonly barcode: string;
}
