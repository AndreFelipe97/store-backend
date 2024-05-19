import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateProductsDto, UpdateProductsDto } from 'src/dtos/Dto';
import { Product } from 'src/entities/products.entity';
import { ProductsService } from 'src/services/products/products.service';

@UseGuards(AuthGuard)
@ApiTags('products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async index(): Promise<Product[]> {
    const products = await this.productsService.findAll();

    return products;
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findById(id);

    return product;
  }

  @Post()
  async create(
    @Body() { description, brand, price, amount, barcode }: CreateProductsDto,
    @Res() response,
  ) {
    await this.productsService.create({
      description,
      brand,
      price,
      amount,
      barcode,
    });

    return response.status(204).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() { description, brand, price, amount, barcode }: UpdateProductsDto,
    @Res() response,
  ) {
    await this.productsService.update({
      id,
      description,
      brand,
      price,
      amount,
      barcode,
    });

    return response.status(204).send();
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response): Promise<string> {
    await this.productsService.delete(id);

    return response.status(204).send();
  }
}
