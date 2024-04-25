import { CaslModule } from 'src/casl/casl.module';
import { DestinatairesController } from './destinataires.controller';
import { DestinatairesService } from './destinataires.service';
import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';

@Module({
  controllers: [DestinatairesController],
  providers: [DestinatairesService, JwtService],
  imports: [CaslModule]
})
export class DestinatairesModule { }
