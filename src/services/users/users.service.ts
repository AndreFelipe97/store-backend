import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return { ...user };
  }

  async create({ name, email, password }): Promise<boolean> {
    const userExists = await this.userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const user = this.userRepository.create({
      name,
      email,
      password,
    });

    await this.userRepository.save(user);

    return true;
  }

  async update({ id, name, email, password }): Promise<boolean> {
    const user = await this.userRepository.preload({
      id,
      name,
      email,
      password,
    });

    const emailExists = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (emailExists && emailExists.id !== id) {
      throw new BadRequestException('Email already exists');
    }

    await this.userRepository.save(user);

    return true;
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.delete(id);

    return true;
  }
}
