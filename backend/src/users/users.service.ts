import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: ['id', 'email', 'role', 'firstName', 'lastName', 'phoneNumber', 'avatar', 'address', 'isActive', 'lastLogin', 'createdAt', 'updatedAt']
    });
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'email', 'role', 'firstName', 'lastName', 'phoneNumber', 'avatar', 'address', 'isActive', 'lastLogin', 'createdAt', 'updatedAt']
    });
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'role', 'firstName', 'lastName', 'isActive']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.userRepository.delete(id);
    return { deleted: true };
  }
}
