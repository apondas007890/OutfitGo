import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('delivery_person')
export class DeliveryPersonEntity {
  @PrimaryGeneratedColumn()
  id: number;  

  @Column()
  name: string;  

  @Column()
  email: string;  

  @Column()
  phone_number: string;  
}
