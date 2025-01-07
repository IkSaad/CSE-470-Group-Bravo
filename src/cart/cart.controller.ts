import { Controller, Post, Get, Param, Body, NotFoundException } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartEntity } from './entity/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  // Endpoint to add product to the user's cart
  @Post('add')
  async addToCart(
    @Body() addToCartDto: { userId: number; productId: number; quantity?: number },
  ): Promise<CartEntity> {
    const { userId, productId, quantity } = addToCartDto;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  // Endpoint to get all cart items for a user
  @Get(':userId')
  async getCartItems(@Param('userId') userId: number): Promise<CartEntity[]> {
    return this.cartService.getCartItems(userId);
  }
}
