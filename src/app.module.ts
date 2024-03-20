import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './resources/archives/archives.module';
import { AuthModule } from './resources/users/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DonationsModule } from './resources/donations/donations.module';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './resources/users/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationsModule,
    PrismaModule,
    UsersModule,
    ArchivesModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
