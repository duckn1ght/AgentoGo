import { Body, Controller, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetMyProfileResponse } from './response/get-my-profile-response';
import { CreateRequisitiesDto } from './dto/create-requisities.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UpdateRequisitiesDto } from './dto/update-requisities.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

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
  
  @Patch()
  updateProfle(@Request() req:AuthRequest, @Body() updateProfileDto:UpdateUserDto){
    return this.profileService.updateProfile(req.user, updateProfileDto)
  }

  @Patch("/requisities/:id")
  updateRequisities(@Request() req:AuthRequest, @Param() requisitiesId: string, @Body() updateRequisitiesDto:UpdateRequisitiesDto){
    return this.profileService.updateRequisities(req.user, requisitiesId, updateRequisitiesDto)
  }

  @Patch("/password")
  updatePassword(@Request() req:AuthRequest, @Body() updatePasswordDto:UpdatePasswordDto){
    return this.profileService.updatePassword(req.user, updatePasswordDto)
  }
}
