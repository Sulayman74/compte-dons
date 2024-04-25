import { CaslModule } from 'src/casl/casl.module';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, JwtService],
  imports: [CaslModule]
})
export class UsersModule { }
