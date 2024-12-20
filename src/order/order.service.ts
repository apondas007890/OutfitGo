import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  // Get all orders
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  // Filter orders by status
  async getOrdersByStatus(status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'): Promise<OrderEntity[]> {
    return await this.orderRepository.find({ where: { status } });
  }

  // Update 
  async updateOrderStatus(
    order_id: number,
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled',
    delivery_person_id?: number,
  ): Promise<{ message: string; order: OrderEntity }> {
    const order = await this.orderRepository.findOne({ where: { order_id } });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Checking if the transition is valid
    const validTransitions = {
      'Pending': ['Processing', 'Cancelled'],
      'Processing': ['Completed', 'Cancelled'],
      'Completed': [], 
      'Cancelled': [],  
    };

    if (validTransitions[order.status].indexOf(status) === -1) {
      throw new BadRequestException(`Invalid status transition from ${order.status} to ${status}`);
    }

    
    if (status === 'Completed' && !delivery_person_id) {
      throw new BadRequestException('Delivery person ID must be provided when marking the order as Completed');
    }

    
    order.status = status;
    if (status === 'Completed' && delivery_person_id) {
      order.delivery_person_id = delivery_person_id;
    }

    // Save the updated order to the database
    const updatedOrder = await this.orderRepository.save(order);

    return { message: 'Order status updated successfully', order: updatedOrder };
  }
}
