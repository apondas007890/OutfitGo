import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryPersonEntity } from './delivery-person.entity';

@Injectable()
export class DeliveryPersonService {
  constructor(
    @InjectRepository(DeliveryPersonEntity)
    private deliveryPersonRepository: Repository<DeliveryPersonEntity>,
  ) {}

  
  async createDeliveryPerson(name: string, email: string, phone_number: string): Promise<DeliveryPersonEntity> {
    const deliveryPerson = this.deliveryPersonRepository.create({
      name,
      email,
      phone_number,
    });

    return this.deliveryPersonRepository.save(deliveryPerson);
  }


  async getDeliveryPersonById(id: number): Promise<DeliveryPersonEntity> {
    const deliveryPerson = await this.deliveryPersonRepository.findOne({ where: { id } });

    if (!deliveryPerson) {
      throw new NotFoundException(`Delivery person with ID ${id} not found`);
    }

    return deliveryPerson;
  }

  
  async updateDeliveryPerson(id: number, name: string, email: string, phone_number: string): Promise<DeliveryPersonEntity> {
    const deliveryPerson = await this.getDeliveryPersonById(id);

    deliveryPerson.name = name;
    deliveryPerson.email = email;
    deliveryPerson.phone_number = phone_number;

    return this.deliveryPersonRepository.save(deliveryPerson);
  }

  
  async deleteDeliveryPerson(id: number): Promise<void> {
    const deliveryPerson = await this.getDeliveryPersonById(id);

    await this.deliveryPersonRepository.remove(deliveryPerson);  // Removes the delivery person from the database
  }
}
