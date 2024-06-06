import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';
import { Client } from 'src/users/client/entities/client.entity';
import { CreateRequisitiesDto } from './dto/create-requisities.dto';
import { Requisities } from 'src/users/client/entities/requisites.entity';

@Injectable()
export class ProfileService {
 constructor(
    @InjectRepository(Client)
    private readonly userRepository: Repository<Client>,
    @InjectRepository(Requisities)
    private readonly requisitiesRepository: Repository<Requisities>,
 ){}

 async getProfile(tokenData: TokenData){
    const user = await this.userRepository.findOne({
      where:{
        id: tokenData.id
      },
      relations:{
        requisities:true,
        address:true,
        organization:true
      }
    })
    return new Profile(user);
 }

 async addRequisities(tokenData: TokenData, createRequisitiesDto: CreateRequisitiesDto){
  const user = await this.userRepository.findOne({
    where:{
      id: tokenData.id
    }
  })
  if (!user) throw new HttpException("Вы не можете создать реквизиты", HttpStatus.CONFLICT)
    
  await this.userRepository.save({
    ...user,
    requisities:createRequisitiesDto
  })

  return JSON.stringify("Реквизиты пользователя созданы")
 }
}
