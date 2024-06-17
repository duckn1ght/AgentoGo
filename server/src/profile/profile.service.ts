import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './models/profile.model';
import { User } from 'src/users/entities/user.entity';
import { CreateRequisitiesDto } from './dto/create-requisities.dto';
import { Requisities } from 'src/users/entities/requisites.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { Address } from 'src/users/entities/address.entity';
import { Organization } from 'src/users/entities/organization.entity';
import { UpdateRequisitiesDto } from './dto/update-requisities.dto';
import * as bcrypt from "bcrypt"
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class ProfileService {
 constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(Organization)
    private readonly organizationRepository: Repository<Organization>,
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
        organization:true,
        authHistories:true
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

 async updateProfile(tokenData:TokenData, updateProfileDto: UpdateUserDto){
    const user = await this.userRepository.findOne({
      where:{
        id: tokenData.id
      },
      relations:{
        address: true,
        organization: true,
        requisities: true      
      }
    })

    if (!user) throw new HttpException("Данный пользователь не найден", HttpStatus.NOT_FOUND)

    await this.userRepository.update(user.id, {
      ...user,
      email: updateProfileDto.email,
      phoneNumber: updateProfileDto.phoneNumber,
      fullName: updateProfileDto.fullName
    })

    await this.addressRepository.update(user.address.id,{
      ...updateProfileDto.address
    })

    await this.organizationRepository.update(user.organization.id,{
      ...updateProfileDto.organization
    })

    return JSON.stringify("Пользователь изменен")
 }

 async updateRequisities(tokenData: TokenData, requisitiesId: string, updateRequisitiesDto: UpdateRequisitiesDto){
  const user = await this.userRepository.findOneBy({id: tokenData.id})

  if(!user) throw new HttpException("Пользователь не зарегистрирован", HttpStatus.CONFLICT)

  await this.requisitiesRepository.update(requisitiesId,{
    ...updateRequisitiesDto
  })

  return JSON.stringify("Реквизиты пользователя обновлены")
 }

 async updatePassword(tokenData:TokenData, updatePasswordDto: UpdatePasswordDto){
  const user = await this.userRepository.findOneBy({id: tokenData.id})
  if(!user) throw new HttpException("Вы не можете сменить пароль", HttpStatus.CONFLICT)

  const isMatch = await bcrypt.compare(updatePasswordDto.oldPassword, user.password)
  if(!isMatch) throw new HttpException('Пароли не совпадают', HttpStatus.CONFLICT)
  
  const salt = await bcrypt.genSalt()
  const hash = await bcrypt.hash(updatePasswordDto.newPassword,salt)

  this.userRepository.update(user.id, {
    ...user,
    password: hash,
    passwordChangeDate: new Date().toISOString()
  })

  return JSON.stringify("Пароль был изменен")
 }
}
