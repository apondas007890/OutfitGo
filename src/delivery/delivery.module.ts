import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryService } from './delivery.service';
import { DeliveryController } from './delivery.controller';
import { DeliveryStatusEntity } from './delivery.entity';
import { OrderEntity } from '../order/order.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([DeliveryStatusEntity, OrderEntity]), 
  ],
  providers: [DeliveryService],
  controllers: [DeliveryController],
})
export class DeliveryModule {}
