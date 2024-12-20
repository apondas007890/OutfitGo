import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderEntity } from './order.entity';

@Controller('orders') // Define the base route for orders
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Get all orders
  @Get('/all')
async getAllOrders(): Promise<OrderEntity[]> {
  return await this.orderService.getAllOrders(); 
}


  
  
@Get('/:status') 
async getOrdersByStatus(@Param('status') status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'): Promise<OrderEntity[]> {
  return await this.orderService.getOrdersByStatus(status);
}

  // Update order status
  @Post('/update')
  async updateOrderStatus(
    @Body('order_id') order_id: number,
    @Body('status') status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled', 
    @Body('delivery_person_id') delivery_person_id?: number,
  ) {
    return await this.orderService.updateOrderStatus(order_id, status, delivery_person_id);
  }


}
