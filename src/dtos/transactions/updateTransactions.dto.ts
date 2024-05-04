import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionsDto } from './createTransactions.dto';

export class UpdateTransactionsDto extends PartialType(CreateTransactionsDto) {}
