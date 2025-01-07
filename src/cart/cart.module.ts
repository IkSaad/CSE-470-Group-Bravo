import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { UsersModule } from 'src/user/user.module';
import { CartEntity } from './entity/cart.entity';
import { ProductsModule } from 'src/products/products.module';
import { UserEntity } from 'src/user/entity/user.entity';
import { Product } from 'src/products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, UserEntity, Product]),
    UsersModule,
    ProductsModule,  // Assuming you have a ProductModule for ProductEntity
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
