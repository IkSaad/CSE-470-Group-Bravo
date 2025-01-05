import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import * as bcrypt from 'bcrypt';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(username: string, password: string, email: string): Promise<UserEntity> {
    // const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    // console.log("From create user: ", password, hashedPassword);
    
    const user = this.userRepository.create({ username, password: password, email });
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }
}
