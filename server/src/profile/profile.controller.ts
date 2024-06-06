import { Body, Controller, Get, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetMyProfileResponse } from './response/get-my-profile-response';
import { CreateRequisitiesDto } from './dto/create-requisities.dto';

@ApiTags('Профиль')
@ApiBearerAuth()
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  @ApiOkResponse({type: GetMyProfileResponse})
  @Get()
  getProfile(@Request() req:AuthRequest){
    return this.profileService.getProfile(req.user)
  }

  @Post("/requisities")
  addRequisities(@Request() req:AuthRequest, @Body()createRequisitiesDto:CreateRequisitiesDto){
    return this.profileService.addRequisities(req.user, createRequisitiesDto)
  }
}
