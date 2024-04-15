import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignIn, SignUp } from '../dto';

@ApiTags('Identité')
@Controller('log')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post('in')
  @ApiBody({ type: SignIn })
  @ApiOkResponse({description:"Connexion réussie"})
  @ApiOperation({description:"L'utilisateur se connecte via ses identifiants",summary:"Sign-in"})
  @ApiBadRequestResponse({description:"une erreur est survenue lors de la création du compte"})
  @ApiConflictResponse({
    description: 'Entrée déjà existante erreur de conflit',
  })
  signIn(@Body() credentials: SignIn) {
    return this._authService.signIn(credentials);
  }
  @Post('up')
  @ApiBody({ type: SignUp })
  signUp(@Body() signUpDto: SignUp) {

    return this._authService.signUp(signUpDto);
  }
}
