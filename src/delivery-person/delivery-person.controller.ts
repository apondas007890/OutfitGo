import { Controller, Post, Body, Param, Get, Put, Delete } from '@nestjs/common';
import { DeliveryPersonService } from './delivery-person.service';

@Controller('delivery-person')
export class DeliveryPersonController {
  constructor(private readonly deliveryPersonService: DeliveryPersonService) {}


  @Post()
  async createDeliveryPerson(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone_number') phone_number: string,
  ) {
    return this.deliveryPersonService.createDeliveryPerson(name, email, phone_number);
  }


  @Get(':id')
  async getDeliveryPerson(@Param('id') id: number) {
    return this.deliveryPersonService.getDeliveryPersonById(id);
  }


  @Put(':id')
  async updateDeliveryPerson(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone_number') phone_number: string,
  ) {
    return this.deliveryPersonService.updateDeliveryPerson(id, name, email, phone_number);
  }

  // Delete a delivery person by ID
  @Delete(':id')
  async deleteDeliveryPerson(@Param('id') id: number) {
    await this.deliveryPersonService.deleteDeliveryPerson(id);
    return { message: `Delivery person with ID ${id} has been deleted` };
  }
}
