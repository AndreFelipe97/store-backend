import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/entities/transactions.entity';
import { transactionNotFound } from 'src/messages/transactions.messages';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
  ) {}

  async findAll(): Promise<Transaction[]> {
    return await this.transactionRepository.find();
  }

  async findById(id: number): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(transactionNotFound);
    }

    return transaction;
  }

  async create({ description, value, category, type, date }): Promise<boolean> {
    const transaction = this.transactionRepository.create({
      description,
      value,
      category,
      type,
      date,
    });
    await this.transactionRepository.save(transaction);
    return true;
  }

  async update({
    id,
    description,
    value,
    category,
    type,
    date,
  }): Promise<boolean> {
    const transaction = await this.transactionRepository.preload({
      id,
      description,
      value,
      category,
      type,
      date,
    });

    if (!transaction) {
      throw new NotFoundException(transactionNotFound);
    }

    this.transactionRepository.save(transaction);

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const transaction = await this.transactionRepository.findOne({
      where: { id },
    });

    if (!transaction) {
      throw new NotFoundException(transactionNotFound);
    }

    await this.transactionRepository.remove(transaction);
    return true;
  }
}
