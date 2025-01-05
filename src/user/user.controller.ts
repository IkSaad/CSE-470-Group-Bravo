import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    NotFoundException,
    BadRequestException,
    UseGuards,
  } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserEntity } from './entity/user.entity';
import { JwtAuthGuard } from 'src/auth/common/local-auth.guard';
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('create')
    async createUser(
      @Body('username') username: string,
      @Body('password') password: string,
      @Body('email') email?: string,
    ): Promise<UserEntity> {
      if (!username || !password) {
        throw new BadRequestException('Username and password are required');
      }
  
      const existingUser = await this.usersService.findByUsername(username);
      if (existingUser) {
        throw new BadRequestException('Username already exists');
      }
  
      return this.usersService.createUser(username, password, email);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get(':username')
    async getUserByUsername(@Param('username') username: string): Promise<UserEntity> {
      const user = await this.usersService.findByUsername(username);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    }


  }
  