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
import { CreateUsersDto } from 'src/dtos/Dto';
import { User } from 'src/entities/users.entity';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(): Promise<User[]> {
    const users = await this.usersService.findAll();

    return users;
  }

  @Get(':id')
  async detail(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findById(id);

    return user;
  }

  @Post()
  async create(
    @Body() { name, email, password }: CreateUsersDto,
    @Res() response,
  ) {
    await this.usersService.create({
      name,
      email,
      password,
    });

    return response.status(204).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() { name, email, password }: CreateUsersDto,
    @Res() response,
  ) {
    await this.usersService.update({
      id,
      name,
      email,
      password,
    });

    return response.status(204).send();
  }

  @Delete(':id')
  async delete(@Param('id') id: number, @Res() response) {
    await this.usersService.delete(id);

    return response.status(204).send();
  }
}
