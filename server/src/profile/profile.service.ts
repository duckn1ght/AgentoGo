import { Inject, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';
import { Client } from 'src/users/client/entities/client.entity';

@Injectable()
export class ProfileService {
 constructor(
    @InjectRepository(Client)
    private readonly userRepository: Repository<Client>,
 ){}

 async getProfile(tokenData: TokenData){
    const user = await this.userRepository.findOne({
      where:{
        id: tokenData.id
      }
    })
    return new Profile(user);
 }
}
