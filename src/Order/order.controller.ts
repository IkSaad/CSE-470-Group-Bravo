import { Controller, Post, Get, Put, Body, Param } from '@nestjs/common';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.entity';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderData: Partial<Order>): Promise<Order> {
    return this.orderService.createOrder(orderData);
  }

  @Get('history/:customerId')
  async getOrderHistory(@Param('customerId') customerId: number): Promise<Order[]> {
    return this.orderService.getOrderHistory(customerId);
  }

  @Put('status/:orderId')
  async updateOrderStatus(@Param('orderId') orderId: number, @Body('status') status: string): Promise<Order> {
    return this.orderService.updateOrderStatus(orderId, status);
  }

  @Put('cancel/:orderId')
  async cancelOrder(@Param('orderId') orderId: number): Promise<Order> {
    return this.orderService.cancelOrder(orderId);
  }

  @Get()
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }
}
