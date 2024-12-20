import { Controller, Param, Body, Post, Get } from '@nestjs/common';
import { DeliveryService } from './delivery.service';

@Controller('delivery')
export class DeliveryController {
  constructor(private readonly deliveryService: DeliveryService) {}

  
  @Post('/update-status/:delivery_status_id')
  async updateDeliveryStatus(
    @Param('delivery_status_id') delivery_status_id: number,
    @Body('newStatus') newStatus: string,
    @Body('reason') reason?: string,
  ) {
    return await this.deliveryService.updateDeliveryStatus(delivery_status_id, newStatus, reason);
  }

  
  @Get('/:delivery_status_id')
  async getDeliveryStatusInfo(@Param('delivery_status_id') delivery_status_id: number) {
    return await this.deliveryService.getDeliveryStatusInfo(delivery_status_id);
  }

  @Get('/all')
  async getAllDeliveryStatuses(@Body('status') status?: string) {
    return await this.deliveryService.getAllDeliveryStatuses(status);
  }


  @Post('/add-completed-orders')
  async addCompletedOrdersToDeliveryStatus() {
    return await this.deliveryService.addCompletedOrdersToDeliveryStatus();
  }
}
