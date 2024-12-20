import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { LoginEntity } from './login.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LoginEntity])],
  providers: [LoginService],
  controllers: [LoginController]
})
export class LoginModule {}
