import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoginEntity } from './login/login.entity';
import { OrderModule } from './order/order.module';
import { OrderEntity } from './order/order.entity';
import { DeliveryModule } from './delivery/delivery.module';
import { DeliveryStatusEntity } from './delivery/delivery.entity';
import { DeliveryPersonModule } from './delivery-person/delivery-person.module';
import { DeliveryPersonEntity } from './delivery-person/delivery-person.entity';



@Module({
  imports: [LoginModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'apondas007890',
    database: 'OutfitGo',
    entities: [LoginEntity,OrderEntity,DeliveryStatusEntity,DeliveryPersonEntity],  // Alternatively, use a dynamic approach to load entities
    synchronize: true, // Be cautious with this in production (use migrations instead)
  }), OrderModule, DeliveryModule,  DeliveryPersonModule, ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
