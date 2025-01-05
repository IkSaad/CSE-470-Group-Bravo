import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './common/local.strategy';
import { JwtStrategy } from './common/jwt.strategy';  // Import JwtStrategy
import { UsersService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [
    UsersModule,  // Only need to import UsersModule once
    PassportModule,  // Required for Passport strategies
    TypeOrmModule.forFeature([UserEntity]),  // Import the UserEntity to interact with the database
    JwtModule.register({
      secret: 'your-secret-key',  // The secret to sign JWT tokens
      signOptions: { expiresIn: '1h' },  // Token expiry time
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],  // Add JwtStrategy to providers
})
export class AuthModule {}
