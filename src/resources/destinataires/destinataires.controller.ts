import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ForbiddenException } from '@nestjs/common';
import { DestinatairesService } from './destinataires.service';
import { CreateDestinataireDto, UpdateDestinataireDto } from './dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiForbiddenResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../users/role.guard';
import { Roles } from '../users/roles.decorator';
import { Action, Role } from '@prisma/client';
import { JwtAuthGuard } from '../users/auth/jwt-auth.guard';
import { CaslAbilityFactory } from '../../casl/casl-ability.factory/casl-ability.factory';
import { Destinataire } from './entities/destinataire.entity';


@Controller('destinataires')
@ApiTags('Destinataire')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DestinatairesController {
  constructor(private readonly destinatairesService: DestinatairesService, private _caslAbilityFactory: CaslAbilityFactory) { }

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    description: "creation d'un destinataire ok",
  })
  @ApiOperation({
    description: 'creation destinataire',
    summary: 'CREATE A DESTINATAIRE',
  })
  @ApiBadRequestResponse({
    description: 'Une erreur est survenue lors de la creation',
  })
  @ApiForbiddenResponse({ description: 'Vous n\'avez pas les autorisations nécessaires' })
  create(@Body() createDestinataireDto: CreateDestinataireDto, @Request() req: any): Promise<Destinataire> {

    const user = req.user;
    console.warn(user, 'user from req');
    const ability = this._caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.MANAGE, user, 'all');
    console.log('Is he Allowed?', isAllowed);
    if (!isAllowed) {
      throw new ForbiddenException('Accès interdit pour toi !!');
    }
    return this.destinatairesService.create(createDestinataireDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  findAll() {

    return this.destinatairesService.findAll();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  findOne(@Param('id') id: string) {
    return this.destinatairesService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(@Param('id') id: string, @Body() updateDestinataireDto: UpdateDestinataireDto) {
    return this.destinatairesService.update(id, updateDestinataireDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string, @Request() req: any) {
    const user = req.user;
    console.warn(user, 'user from req');
    const ability = this._caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.MANAGE, user, 'all');
    console.log('Is he Allowed?', isAllowed);
    if (!isAllowed) {
      throw new ForbiddenException('Accès interdit pour toi !!');
    }
    return this.destinatairesService.remove(id);
  }
}
