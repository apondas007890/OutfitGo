import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryStatusEntity } from './delivery.entity';
import { OrderEntity } from '../order/order.entity';  

@Injectable()
export class DeliveryService {
  constructor(
    @InjectRepository(DeliveryStatusEntity)
    private readonly deliveryStatusRepository: Repository<DeliveryStatusEntity>,

    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}


  async updateDeliveryStatus(delivery_status_id: number, newStatus: string, reason?: string) {
    // Define valid statuses
    const validStatuses: ('Awaiting Shipment' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned')[] = [
      'Awaiting Shipment', 'Shipped', 'In Transit', 'Delivered', 'Returned'
    ];


    if (!validStatuses.includes(newStatus as 'Awaiting Shipment' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned')) {
      throw new BadRequestException('Invalid delivery status');
    }

    const deliveryStatus = await this.deliveryStatusRepository.findOne({ where: { delivery_status_id } });

    if (!deliveryStatus) {
      throw new BadRequestException('Delivery status not found');
    }

    
    const currentStatusIndex = validStatuses.indexOf(deliveryStatus.delivery_status);
    const newStatusIndex = validStatuses.indexOf(newStatus as 'Awaiting Shipment' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned');
    if (currentStatusIndex >= newStatusIndex) {
      throw new BadRequestException('Status cannot go backward');
    }


    deliveryStatus.delivery_status = newStatus as 'Awaiting Shipment' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned';

    
    if (newStatus === 'Returned') {
      if (reason) {
        deliveryStatus.reason = reason;  
      } else {
        throw new BadRequestException('Reason must be provided when status is "Returned"');
      }
    } else {
      
      deliveryStatus.reason = null;
    }

    // Save the updated record
    await this.deliveryStatusRepository.save(deliveryStatus);
    return { message: 'Delivery status updated successfully', deliveryStatus };
  }

 
  async getDeliveryStatusInfo(delivery_status_id: number) {
    const deliveryStatus = await this.deliveryStatusRepository.findOne({
      where: { delivery_status_id },
      relations: ['order'],
    });

    if (!deliveryStatus) {
      throw new BadRequestException('Delivery status not found');
    }

    return deliveryStatus;
  }


  async getAllDeliveryStatuses(filterStatus?: string) {
    const query = this.deliveryStatusRepository.createQueryBuilder('deliveryStatus')
      .leftJoinAndSelect('deliveryStatus.order', 'order');

    if (filterStatus) {
      query.andWhere('deliveryStatus.delivery_status = :status', { status: filterStatus });
    }

    const deliveryStatuses = await query.getMany();
    return deliveryStatuses;
  }


  async addCompletedOrdersToDeliveryStatus() {
    const completedOrders = await this.orderRepository.find({
      where: { status: 'Completed' },
    });

    if (completedOrders.length === 0) {
      throw new BadRequestException('No completed orders found');
    }

    const deliveryStatusEntities = completedOrders.map(order => {
      const deliveryStatus = new DeliveryStatusEntity();
      deliveryStatus.order = order;
      deliveryStatus.delivery_status = 'Awaiting Shipment';  
      deliveryStatus.updated_at = new Date();
      return deliveryStatus;
    });

   
    await this.deliveryStatusRepository.save(deliveryStatusEntities);
    return { message: 'Completed orders added to delivery status table' };
  }
}
