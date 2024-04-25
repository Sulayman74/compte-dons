import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './resources/archives/archives.module';
import { AuthModule } from './resources/users/auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ConfigModule } from '@nestjs/config';
import { DestinatairesModule } from './resources/destinataires/destinataires.module';
import { DonationsModule } from './resources/donations/donations.module';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './resources/users/users.module';
@Module({
  imports: [
    ArchivesModule,
    AuthModule,
    CaslModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DestinatairesModule,
    DonationsModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
