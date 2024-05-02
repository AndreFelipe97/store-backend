import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from 'src/entities/products.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      description: 'Arroz',
      brand: 'Fortaleza',
      price: 10.5,
      amount: 20,
      barcode: '1111111111',
    },
    {
      id: 2,
      description: 'Feijão',
      brand: 'Fortaleza',
      price: 12,
      amount: 10,
      barcode: '1111111112',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: number): Product {
    const product = this.products.find((product) => product.id === +id);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  create({ description, brand, price, amount, barcode }): boolean {
    const id = this.products.length + 1;
    const barcodeExists = this.products.some(
      (product) => product.barcode === barcode,
    );

    if (barcodeExists) {
      throw new BadRequestException('Barcode already exists');
    }

    this.products.push({ id, description, brand, price, amount, barcode });
    return true;
  }

  update({ id, description, brand, price, amount, barcode }): boolean {
    const productIndex = this.products.findIndex(
      (product) => product.id === +id,
    );

    const barcodeExists = this.products.some(
      (product) => product.barcode === barcode,
    );

    if (productIndex < 0) {
      throw new NotFoundException('Product not found');
    }

    if (barcodeExists && this.products[productIndex].barcode !== barcode) {
      throw new BadRequestException('Barcode already exists');
    }

    this.products[productIndex] = {
      id: +id,
      description,
      brand,
      price,
      amount,
      barcode,
    };
    return true;
  }

  delete(id: number): boolean {
    const productIndex = this.products.findIndex(
      (product) => product.id === +id,
    );

    if (productIndex < 0) {
      throw new NotFoundException('Product not found');
    }

    this.products.splice(productIndex, 1);
    return true;
  }
}
