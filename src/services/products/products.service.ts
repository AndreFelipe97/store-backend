import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import {
  productBarCodeExists,
  productNotFound,
} from 'src/messages/products.messages';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findById(id: number): Promise<Product> {
    const product = this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(productNotFound);
    }

    return product;
  }

  async create({
    description,
    brand,
    price,
    amount,
    barcode,
  }): Promise<boolean> {
    const barcodeExists = this.productRepository.findOne({
      where: { barcode },
    });

    if (barcodeExists) {
      throw new BadRequestException(productBarCodeExists);
    }

    const product = this.productRepository.create({
      description,
      brand,
      price,
      amount,
      barcode,
    });

    await this.productRepository.save(product);

    return true;
  }

  async update({
    id,
    description,
    brand,
    price,
    amount,
    barcode,
  }): Promise<boolean> {
    const product = await this.productRepository.preload({
      id,
      description,
      brand,
      price,
      amount,
      barcode,
    });

    const barcodeExists = await this.productRepository.findOne({
      where: { barcode },
    });

    if (!product) {
      throw new NotFoundException(productNotFound);
    }

    if (barcodeExists && product.barcode !== barcode) {
      throw new BadRequestException(productBarCodeExists);
    }

    this.productRepository.save(product);

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(productNotFound);
    }

    await this.productRepository.remove(product);

    return true;
  }
}
