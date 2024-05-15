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
import { CreateTransactionsDto, UpdateTransactionsDto } from 'src/dtos/Dto';
import { Transaction } from 'src/entities/transactions.entity';
import { TransactionsService } from 'src/services/transactions/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsServices: TransactionsService) {}

  @Get()
  async indexedDB(): Promise<Transaction[]> {
    const transactions = await this.transactionsServices.findAll();

    return transactions;
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<Transaction> {
    const transaction = await this.transactionsServices.findById(id);

    return transaction;
  }

  @Post()
  async create(
    @Body() { description, value, category, type, date }: CreateTransactionsDto,
    @Res() response,
  ) {
    await this.transactionsServices.create({
      description,
      value,
      category,
      type,
      date,
    });

    return response.status(204).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() { description, value, category, type, date }: UpdateTransactionsDto,
    @Res() response,
  ) {
    await this.transactionsServices.update({
      id,
      description,
      value,
      category,
      type,
      date,
    });

    return response.status(204).send();
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response) {
    await this.transactionsServices.delete(id);

    return response.status(204).send();
  }
}
