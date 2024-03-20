import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Donation } from './entities/donation.entity';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';

@Controller('donations')
@ApiTags('Donations')
export class DonationsController {
  constructor(private readonly donationsService: DonationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: "EndPoint pour la création d'un don",
    summary: 'CREATE A DON',
  })
  @ApiCreatedResponse({ description: 'Don créé avec succès' })
  @ApiBody({ type: CreateDonationDto })
  @ApiConflictResponse({ description: 'Don déjà existant' })
  @ApiBadRequestResponse({
    description: 'Une erreur est survenue lors de la creation',
  })
  create(@Body() createDonationDto: CreateDonationDto, @Request() req) {
    return this.donationsService.create(createDonationDto, req.user.id);
  }

  @Get()
  @ApiOperation({
    description: 'Recherche de tous les dons',
    summary: 'GET ALL DONS',
  })
  @ApiOkResponse({ description: 'Tous les dons ont été trouvés' })
  @ApiNotFoundResponse({ description: 'Pas de dons' })
  findAll() {
    return this.donationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    description: 'Recherche de don par son ID',
    summary: 'GET DON BY ID',
  })
  @ApiOkResponse({ description: 'le don recherché par son id retrouvé' })
  @ApiParam({ name: 'id', description: 'identifiant don' })
  @ApiNotFoundResponse({ description: 'Id du don non existant' })
  findOne(@Param('id') id: string) {
    return this.donationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Don mise à jour OK' })
  @ApiOperation({ description: 'Mise à jour du don', summary: 'PATCH' })
  @ApiNotFoundResponse({ description: 'Id du don non existant' })
  @ApiBody({ type: Donation })
  @ApiParam({ name: 'id', description: 'identifiant don' })
  update(
    @Param('id') id: string,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    return this.donationsService.update(id, updateDonationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Don supprimé correctement' })
  @ApiOperation({ description: 'suppression du don', summary: 'DELETE' })
  @ApiNotFoundResponse({ description: 'Don déjà supprimé' })
  @ApiParam({ name: 'id', description: 'identifiant don' })
  remove(@Param('id') id: string) {
    return this.donationsService.remove(id);
  }
}
