import { PartialType } from '@nestjs/swagger';
import { CreateProductsDto } from './createProducts.dto';

export class UpdateProductsDto extends PartialType(CreateProductsDto) {}
