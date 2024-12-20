import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginEntity } from './login.entity';
import { LoginDto } from './login.dto';


@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    return await this.loginService.login(loginDto);
  }
    
  @Post('/add')
  async addLogin(@Body() userData: Partial<LoginEntity>) {
    
    return await this.loginService.addLogin(userData);
  }
  
  @Get('/all')
  async getAllLogins(): Promise<LoginEntity[]> {
    return await this.loginService.getAllLogins();
  }
  
}
