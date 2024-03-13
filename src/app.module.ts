import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DonationsModule } from './resources/donations/donations.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './resources/users/users.module';
import { ArchivesModule } from './resources/archives/archives.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DonationsModule,
    PrismaModule,
    UsersModule,
    ArchivesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
