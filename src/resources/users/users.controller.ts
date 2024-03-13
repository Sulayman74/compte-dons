import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    description: "creation d'un utilisateur ok",
    type: User,
  })
  @ApiOperation({
    description: 'creation utilisateur',
    summary: 'CREATE A USER',
  })
  @ApiBadRequestResponse({
    description: 'Une erreur est survenue lors de la creation',
  })
  @ApiConflictResponse({
    description: 'Entrée déjà existante erreur de conflit'
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'retour des users ok',
    isArray: true,
    type: User,
  })
  @ApiOperation({
    description: 'Get de tous les users',
    summary: 'GET ALL USERS',
  })
  @ApiNotFoundResponse({ description: 'Aucun utilisateur trouvé' })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({
    description: "retour de l'utilisateur par son ID",
    type: User,
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
