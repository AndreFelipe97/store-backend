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
  detail(@Param() { id }, @Res() response): Product {
    const product = this.productsService.findById(id);

    return response.json(product);
  }

  @Post()
  create(
    @Body() { description, brand, price, amount, barcode },
    @Res() response,
  ) {
    this.productsService.create({
      description,
      brand,
      price,
      amount,
      barcode,
    });

    return response.status(204).send();
  }

  @HttpCode(204)
  @Put(':id')
  update(
    @Param() { id },
    @Body() { description, brand, price, amount, barcode },
    @Res() response,
  ) {
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
