import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Product } from 'src/entities/products.entity';
import { ProductsService } from 'src/services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  index(): Product[] {
    const products = this.productsService.findAll();

    return products;
  }

  @Get(':id')
  detail(@Param() { id }, @Res() response): Product | string {
    const product = this.productsService.findById(id);

    if (typeof product === 'string') {
      return response.status(404).json({ message: product });
    }

    return response.json(product);
  }

  @Post()
  create(
    @Body() { description, brand, price, amount, barcode },
    @Res() response,
  ): string {
    const productCreated = this.productsService.create({
      description,
      brand,
      price,
      amount,
      barcode,
    });
    if (!productCreated) {
      response.status(400).json({ message: 'Product not created' });
    }
    return response.status(204).send();
  }

  @HttpCode(204)
  @Put(':id')
  update(
    @Param() { id },
    @Body() { description, brand, price, amount, barcode },
    @Res() response,
  ): string {
    this.productsService.update({
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
  delete(@Param() { id }, @Res() response): string {
    const productDeleted = this.productsService.delete(id);

    if (!productDeleted) {
      return response.status(404).json({ message: 'Product not deleted' });
    }

    return response.status(204).send();
  }
}
