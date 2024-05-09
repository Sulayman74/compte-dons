import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArchivesModule } from './resources/archives/archives.module';
import { ArchivesService } from './resources/archives/archives.service';
import { AuthModule } from './resources/users/auth/auth.module';
import { CaslModule } from './casl/casl.module';
import { ConfigModule } from '@nestjs/config';
import { CorsMiddlewareService } from './utils/cors-middleware/cors-middleware.service';
import { DestinatairesModule } from './resources/destinataires/destinataires.module';
import { DonationsModule } from './resources/donations/donations.module';
import { PrismaModule } from './prisma/prisma.module';
import { ScheduleModule } from '@nestjs/schedule';
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
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, CorsMiddlewareService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddlewareService)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
