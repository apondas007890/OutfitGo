import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { OrderEntity } from '../order/order.entity';  // Adjust path if necessary

@Entity('Delivery_Status')
export class DeliveryStatusEntity {
  @PrimaryGeneratedColumn()
  delivery_status_id: number;

  @ManyToOne(() => OrderEntity, order => order.deliveryStatuses)
  order: OrderEntity;

  @Column({
    type: 'enum',
    enum: ['Awaiting Shipment', 'Shipped', 'In Transit', 'Delivered', 'Returned'],
    default: 'Awaiting Shipment',
  })
  delivery_status: 'Awaiting Shipment' | 'Shipped' | 'In Transit' | 'Delivered' | 'Returned';

  @Column({ type: 'text', nullable: true })
  reason: string | null;  

  @CreateDateColumn()
  updated_at: Date;

  @UpdateDateColumn()
  updated_at_on_change: Date; 
    order_id: any;
}
