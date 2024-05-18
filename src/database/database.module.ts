import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        return {
          type: process.env.DATABASE_TYPE as any,
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT),
          username: process.env.DATABASE_USERNAME,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE,
          entities: [Product, Transaction, User],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
