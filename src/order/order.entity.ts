import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Orders') 
export class OrderEntity {
  @PrimaryGeneratedColumn() 
  order_id: number; 

  @Column()
  customer_id: number; 

  @Column({
    type: 'enum',
    enum: ['Pending', 'Processing', 'Cancelled', 'Completed'], 
    default: 'Pending', 
  })
  status: 'Pending' | 'Processing' | 'Cancelled' | 'Completed'; 

  @Column({ nullable: true }) 
  delivery_person_id: number; 

  @Column('decimal') 
  total_amount: number; 
    deliveryStatuses: any;
    returns: any;
    id: any;
  returnsAndRefunds: any;
}
