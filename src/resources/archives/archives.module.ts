import { ArchivesController } from './archives.controller';
import { ArchivesService } from './archives.service';
import { CaslModule } from 'src/casl/casl.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [ArchivesController],
  providers: [ArchivesService],
  imports: [CaslModule]
})
export class ArchivesModule { }
