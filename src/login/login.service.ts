import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginEntity } from './login.entity';
import { LoginDto } from './login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(LoginEntity)
    private readonly loginRepository: Repository<LoginEntity>,
  ) {}



  async login(loginDto: LoginDto): Promise<{ message: string; user: LoginEntity }> {
    const { email, password } = loginDto;

    
    const user = await this.loginRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }


    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }


    if (user.role !== 'Delivery Manager') {
      throw new UnauthorizedException('Access denied, role must be Delivery Manager');
    }

 
    return {
      message: 'Login successful',
      user, 
    };
  }

   // Add a new login entry and return a success message with the inserted data
  async addLogin(userData: Partial<LoginEntity>): Promise<{ message: string; user: LoginEntity }> {
    const { email } = userData;
    // Check if email already exists in the database
    const existingUser = await this.loginRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('This email is already Registered');
    }

    const login = this.loginRepository.create(userData); // Create a new instance of LoginEntity with the provided userData
    const savedLogin = await this.loginRepository.save(login); // Save the entity to the database

    // Return a success message and the saved login data
    return {
      message: 'Data inserted successfully!',
      user: savedLogin, // The saved user data (including auto-generated ID)
    };
  }

  // Get all login entries
  async getAllLogins(): Promise<LoginEntity[]> {
    return await this.loginRepository.find();
  }

}
