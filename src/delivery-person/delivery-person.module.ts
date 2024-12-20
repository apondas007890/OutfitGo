import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryPersonEntity } from './delivery-person.entity';
import { DeliveryPersonService } from './delivery-person.service';
import { DeliveryPersonController } from './delivery-person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryPersonEntity])],
  providers: [DeliveryPersonService],
  controllers: [DeliveryPersonController],
})
export class DeliveryPersonModule {}
