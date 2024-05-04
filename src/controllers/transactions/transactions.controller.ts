import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Transaction } from 'src/entities/transactions.entity';
import { TransactionsService } from 'src/services/transactions/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsServices: TransactionsService) {}

  @Get()
  indexedDB(): Transaction[] {
    const transactions = this.transactionsServices.findAll();

    return transactions;
  }

  @Get(':id')
  detail(@Param('id') id: number, @Res() response): Transaction {
    const transaction = this.transactionsServices.findById(id);

    return response.json(transaction);
  }

  @Post()
  create(
    @Body() { description, valor, category, type, date },
    @Res() response,
  ): string {
    this.transactionsServices.create({
      description,
      valor,
      category,
      type,
      date,
    });

    return response.status(204).send();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() { description, valor, category, type, date },
    @Res() response,
  ): string {
    this.transactionsServices.update({
      id,
      description,
      valor,
      category,
      type,
      date,
    });

    return response.status(204).send();
  }

  @Delete(':id')
  delete(@Param('id') id: number, @Res() response): string {
    this.transactionsServices.delete(id);

    return response.status(204).send();
  }
}
