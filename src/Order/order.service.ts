import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '/Documents and Settings';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async createOrder(orderData: Partial<Order>): Promise<Order> {
    const newOrder = this.orderRepository.create(orderData);
    return this.orderRepository.save(newOrder);
  }

  async getOrderHistory(customerId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customer: { id: customerId } },
      relations: ['customer'],
    });
  }

  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (order) {
      order.status = status;
      return this.orderRepository.save(order);
    }
    throw new Error('Order not found');
  }

  async cancelOrder(orderId: number): Promise<Order> {
    const order = await this.orderRepository.findOne({ where: { id: orderId } });
    if (order && order.status === 'Processing') {
      order.isCanceled = true;
      order.status = 'Canceled';
      return this.orderRepository.save(order);
    }
    throw new Error('Order cannot be canceled');
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.find();
  }
}
