import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

import { MongoRepository } from 'typeorm';
import { User } from 'src/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: MongoRepository<User>,
  ) {}

  async create(createUserDto: UserDTO): Promise<UserDTO> {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    const user = await this.usersRepository.update(id, updateUserDto);
    return user;
  }

  async remove(id: number) {
    const user = await this.usersRepository.delete(id);
    return user;
  }
}
