import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/user/user.service';
import { JwtPayload } from 'src/interface/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extract JWT from Authorization header
      secretOrKey: 'your-secret-key',  // Secret key to validate JWT
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);  // Use user ID from JWT payload
    if (!user) {
      throw new Error('User not found');
    }
    return user;  // Return the user if valid
  }
}
