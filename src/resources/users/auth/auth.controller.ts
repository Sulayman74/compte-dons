import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { SignIn } from '../dto';

@ApiTags('Identité')
@Controller('log')
export class AuthController {
  constructor(private _authService: AuthService) {}
  @Post()
  @ApiBody({ type: SignIn })
  signIn(@Body() credentials: SignIn) {
    return this._authService.signIn(credentials);
  }
}
