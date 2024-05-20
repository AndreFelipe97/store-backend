import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class UserSeedService {
  constructor(private readonly usersService: UsersService) {}

  async create() {
    await this.usersService.create({
      name: 'Admin',
      email: 'admin@gmail.com',
      password: 'admin',
    });
  }
}
