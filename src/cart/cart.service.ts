import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { CartEntity } from './entity/cart.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number = 1): Promise<CartEntity> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new Error('User not found');
    }

    const product = await this.productRepository.find({where: {id:productId}});
    if (!product) {
      throw new Error('Product not found');
    }

    let cartItem = await this.cartRepository.findOne({
      where: { userId, productId },
    });

    if (cartItem) {
      // If item already exists in the cart, update the quantity
      cartItem.quantity += quantity;
      return this.cartRepository.save(cartItem);
    } else {
      // If item is not in the cart, create a new cart item
      const newCartItem = this.cartRepository.create({
        userId,
        productId,
        quantity,
      });
      return this.cartRepository.save(newCartItem);
    }
  }

  async getCartItems(userId: number): Promise<CartEntity[]> {
    return this.cartRepository.find({ where: { userId } });
  }
}
