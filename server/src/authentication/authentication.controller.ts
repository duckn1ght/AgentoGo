import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants';
import { CreateClientDto } from 'src/users/client/dto/create-client.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Public()
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authenticationService.signIn(signInDto);
  }
  
  @Public()
  @Post('register/client')
  signUp(@Body() createClientDto: CreateClientDto) {
    return this.authenticationService.signUp(createClientDto);
  }
}
