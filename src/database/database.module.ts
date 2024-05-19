import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { Transaction } from 'src/entities/transactions.entity';
import { User } from 'src/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return {
          type: configService.get('DATABASE_TYPE') as any,
          host: configService.get('DATABASE_HOST'),
          port: parseInt(configService.get('DATABASE_PORT')),
          username: configService.get('DATABASE_USERNAME'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE') as string,
          entities: [Product, Transaction, User],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
