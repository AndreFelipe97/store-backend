import { PartialType } from '@nestjs/swagger';
import { CreateTransactionsDto } from './createTransactions.dto';

export class UpdateTransactionsDto extends PartialType(CreateTransactionsDto) {}
