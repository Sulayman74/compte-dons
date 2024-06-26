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
  ForbiddenException,
  Query,
} from '@nestjs/common';
import { DonationsService } from './donations.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { UpdateDonationDto } from './dto/update-donation.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action, Role } from '@prisma/client';
import { RoleGuard } from '../users/role.guard';

@Controller('donations')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Donations')
export class DonationsController {
  constructor(
    private readonly donationsService: DonationsService,
    private _caslAbilityFactory: CaslAbilityFactory,
  ) { }

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
  create(@Body() createDonationDto: CreateDonationDto) {
    console.log("hello world donation controller", createDonationDto);
    return this.donationsService.create(createDonationDto);
  }

  @Get()
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    description: 'Recherche de tous les dons si role = Admin/ sinon recherche des dons selon id du user connecté',
    summary: 'GET ALL DONS/OR...',
  })
  @ApiOkResponse({ description: 'Tous les dons ont été trouvés', isArray: true })
  @ApiNotFoundResponse({ description: 'Pas encore de dons' })
  async findAll(@Request() req: any): Promise<Donation[]> {
    const user = req.user;
    // console.log('dans les dons je suis le user', user);


    let donations = []
    if (user.role === Role.ADMIN) {
      donations = await this.donationsService.findAll();
    } else {
      donations = await this.donationsService.findByUserID(user.sub);
      // console.log(user.sub);
    }
    return donations
  }

  @Get(':id')
  @ApiOperation({
    description: 'Recherche de don par son ID',
    summary: 'GET DON BY ID',
  })
  @ApiOkResponse({ description: 'le don recherché par son id retrouvé' })
  @ApiParam({ name: 'id', description: 'identifiant don' })
  @ApiNotFoundResponse({ description: 'Id du don non existant' })
  findOne(@Param('id') id: string, @Request() req: any) {
    const user = req.user;
    console.warn(user, 'user from req');
    const ability = this._caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.MANAGE, Donation);
    console.log('Is he Allowed?', isAllowed);
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
    @Request() req: any,
    @Body() updateDonationDto: UpdateDonationDto,
  ) {
    console.log(updateDonationDto);
    const user = req.user;
    const ability = this._caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.MANAGE, Donation);
    console.log('Is he Allowed?', isAllowed);
    return this.donationsService.update(id, updateDonationDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Don supprimé correctement' })
  @ApiOperation({ description: 'suppression du don', summary: 'DELETE' })
  @ApiNotFoundResponse({ description: 'Don déjà supprimé' })
  @ApiParam({ name: 'id', description: 'identifiant don' })
  remove(@Param('id') id: string, @Request() req: any) {
    const user = req.user;
    console.warn(user, 'user from req');
    const ability = this._caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.MANAGE, Donation);
    console.log('Is he Allowed?', isAllowed);
    return this.donationsService.remove(id);
  }
}
