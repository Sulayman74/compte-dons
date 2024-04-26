import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RoleGuard } from './role.guard';
import { Action, Role } from '@prisma/client';
import { Roles } from './roles.decorator';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private _caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @Post()
  @Roles(Role.ADMIN)
  @ApiCreatedResponse({
    description: "creation d'un utilisateur ok",
  })
  @ApiOperation({
    description: 'creation utilisateur',
    summary: 'CREATE A USER',
  })
  @ApiBadRequestResponse({
    description: 'Une erreur est survenue lors de la creation',
  })
  @ApiConflictResponse({
    description: 'Entrée déjà existante erreur de conflit',
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(RoleGuard)

  @ApiOkResponse({
    description: 'Retour des users OK',
    isArray: true,
  })
  @ApiOperation({
    description: 'Recherche de tous les users si role = Admin',
    summary: 'GET ALL USERS',
  })
  @ApiNotFoundResponse({ description: 'Aucun utilisateur trouvé' })
  async findAll(@Request() req: any): Promise<User[]> {
    const user = req.user;
    console.warn('user from req', user, 'role', user.role);
    const ability = this._caslAbilityFactory.createForUser(user);
    const isAllowed = ability.can(Action.MANAGE, user, 'all');
    console.log('Is he Allowed?', isAllowed);

    if (!isAllowed) {
      throw new ForbiddenException(
        "Vous n'avez pas les droits et accès à ces informations",
      );
    } else {
      return await this.usersService.findAll();
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)

  @ApiOkResponse({
    description: "retour de l'utilisateur par son ID",
  })
  @ApiOperation({
    description: "Get de l'utilisateur par son id unique",
    summary: 'GET ONE USER',
  })
  @ApiNotFoundResponse({ description: 'Aucun utilisateur trouvé' })
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'UPDATE DATA USER',
    description: "mise à jour données de l'utilisateur",
  })
  @ApiOkResponse({ description: "mise à jour des données de l'utilisateur OK" })
  @ApiNotFoundResponse({ description: 'Aucun utilisateur trouvé' })
  @ApiUnauthorizedResponse({
    description: "Vous n'êtes pas autorisé à mettre à jour un autre profil",
  })
  @ApiForbiddenResponse({
    description: "Vous n'avez pas accès à cet action par manque de droit",
  })
  @ApiBody({ type: UpdateUserDto, description: 'USERS DATA' })
  @ApiParam({
    name: 'id',
    description: "Identifiant de l'utilisateur à mettre à jour.",
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req: any,
  ) {
    try {
      const user = req.user;

      if (user.sub === id || user.role === Role.ADMIN) {
        return this.usersService.updateUser(id, updateUserDto);
      } else {
        throw new ForbiddenException(
          "Vous n'êtes pas autorisé à mettre à jour cet utilisateur",
        );
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à mettre à jour cet utilisateur",
      );
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiOperation({
    summary: 'DELETE A USER',
    description: 'Supprime un utilisateur existant en fonction de son ID.',
  })
  @ApiOkResponse({
    description: "Données de l'utilisateur supprimées correctement",
  })
  @ApiNotFoundResponse({ description: 'Aucun utilisateur trouvé' })
  @ApiParam({
    name: 'id',
    description: "Identifiant de l'utilisateur à supprimer.",
  })
  remove(@Param('id') id: string, @Request() req: any) {

    try {
      const user = req.user;

      if ( user.role === Role.ADMIN) {
        return this.usersService.remove(id, req);
      } else {
        throw new ForbiddenException(
          "Vous n'êtes pas autorisé à mettre à jour cet utilisateur",
        );
      }
    } catch (error) {
      console.log(error);
      throw new ForbiddenException(
        "Vous n'êtes pas autorisé à mettre à jour cet utilisateur",
      );
    }

    
  }
}
