import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsController } from 'src/controllers/transactions/transactions.controller';
import { TransactionsService } from 'src/services/transactions/transactions.service';
import { Transaction } from 'src/entities/transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}
