import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/entities/transactions.entity';
import { transactionNotFound } from 'src/messages/transactions.messages';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [
    {
      id: 1,
      description: 'Coca-cola',
      value: 800,
      category: 'Refrigerantes',
      type: 'outcome',
      date: new Date(),
    },
  ];

  findAll(): Transaction[] {
    return this.transactions;
  }

  findById(id: number): Transaction {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === id,
    );

    if (!transaction) {
      throw new NotFoundException(transactionNotFound);
    }

    return transaction;
  }

  create({ description, value, category, type, date }): boolean {
    const id = this.transactions.length + 1;

    this.transactions.push({ id, description, value, category, type, date });
    return true;
  }

  update({ id, description, value, category, type, date }): boolean {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );

    if (transactionIndex < 0) {
      throw new NotFoundException(transactionNotFound);
    }

    this.transactions[transactionIndex] = {
      id,
      description:
        description || this.transactions[transactionIndex].description,
      value: value || this.transactions[transactionIndex].value,
      category: category || this.transactions[transactionIndex].category,
      type: type || this.transactions[transactionIndex].type,
      date: date || this.transactions[transactionIndex].date,
    };

    return true;
  }

  delete(id: number): boolean {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === id,
    );

    if (transactionIndex < 0) {
      throw new NotFoundException(transactionNotFound);
    }

    this.transactions.splice(transactionIndex, 1);
    return true;
  }
}
