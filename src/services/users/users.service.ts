import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
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

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async create({ name, email, password }): Promise<boolean> {
    const userExists = await this.userRepository.findOne({ where: { email } });

    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hash(
      password,
      +this.configService.get('BCRYPT_SALT'),
    );

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.userRepository.save(user);

    return true;
  }

  async update({ id, name, email, password }): Promise<boolean> {
    const hashedPassword = await hash(
      password,
      +this.configService.get('BCRYPT_SALT'),
    );

    const user = await this.userRepository.preload({
      id,
      name,
      email,
      password: hashedPassword,
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
