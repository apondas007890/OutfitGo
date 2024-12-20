import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Login') 
export class LoginEntity {
  @PrimaryGeneratedColumn() 
  id: number; 

  @Column({ unique: true })
  email: string; 

  @Column()
  password: string; 

  @Column()
  role: string; 
}
