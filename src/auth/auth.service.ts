import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    console.log("User Found:", user);
  
    if (user) {
      // Compare the plain text password with the hashed password stored in the database
      const isPasswordMatching = await bcrypt.compare(password, user.password);
  
      console.log('Is Password Matching:', isPasswordMatching);
  
      if (isPasswordMatching) {
        const { password, ...result } = user;
        return result;
      }
    }
  
    console.log("Invalid Credentials");
    return null;
  }
  
  
  

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
