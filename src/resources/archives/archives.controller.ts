import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArchivesService } from './archives.service';
import { CreateArchiveDto } from './dto/create-archive.dto';
import { UpdateArchiveDto } from './dto/update-archive.dto';
import { Role } from '@prisma/client';
import { RoleGuard } from '../users/role.guard';
import { Roles } from '../users/roles.decorator';

@Controller('archives')
@UseGuards(RoleGuard)
@Roles(Role.ADMIN)
export class ArchivesController {
  constructor(private readonly archivesService: ArchivesService) { }

  @Post()
  archivedDonation() {
    return this.archivesService.archiveDonations()
  }

  @Get()
  findAll() {
    return this.archivesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.archivesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArchiveDto: UpdateArchiveDto) {
    return this.archivesService.update(+id, updateArchiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.archivesService.remove(+id);
  }
}
