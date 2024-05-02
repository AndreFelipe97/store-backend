import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/entities/transactions.entity';
import { transactionNotFound } from 'src/messages/transactions.messages';

@Injectable()
export class TransactionsService {
  private transactions: Transaction[] = [
    {
      id: 1,
      description: 'Coca-cola',
      valor: 800,
      category: 'Refrigerantes',
      type: 'without',
      date: '2/5/2024',
    },
  ];

  findAll(): Transaction[] {
    return this.transactions;
  }

  findById(id: number): Transaction {
    const transaction = this.transactions.find(
      (transaction) => transaction.id === +id,
    );

    if (!transaction) {
      throw new NotFoundException(transactionNotFound);
    }

    return transaction;
  }

  create({ description, valor, category, type, date }): boolean {
    const id = this.transactions.length + 1;

    this.transactions.push({ id, description, valor, category, type, date });
    return true;
  }

  update({ id, description, valor, category, type, date }): boolean {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === +id,
    );

    if (transactionIndex < 0) {
      throw new NotFoundException(transactionNotFound);
    }

    this.transactions[transactionIndex] = {
      id: +id,
      description,
      valor,
      category,
      type,
      date,
    };

    return true;
  }

  delete(id: number): boolean {
    const transactionIndex = this.transactions.findIndex(
      (transaction) => transaction.id === +id,
    );

    if (transactionIndex < 0) {
      throw new NotFoundException(transactionNotFound);
    }

    this.transactions.splice(transactionIndex, 1);
    return true;
  }
}
