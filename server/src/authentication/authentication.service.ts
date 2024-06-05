import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Client } from 'src/users/client/entities/client.entity';
import { CreateClientDto } from 'src/users/client/dto/create-client.dto';
import { Address } from 'src/users/client/entities/address.entity';
import { Organization } from 'src/users/client/entities/organization.entity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
  ){}

  async signIn(signInDto: SignInDto) {
    const user = await this.clientRepository.findOne({
      where:{
        email: signInDto.email
      }
    })

    if(!user){
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
    }
    
    const isMatch = await bcrypt.compare(signInDto.password, user.password)

    if(!isMatch){
      throw new HttpException('Некорректный пароль', HttpStatus.UNAUTHORIZED)
    }

    const payload:TokenData = {id:user.id}
    const token = await this.jwtService.signAsync(payload)

    return JSON.stringify(token);
  }
  async signUp(signUp: CreateClientDto) {
    const clientExist = await this.clientRepository.count({
      where:{
        email: signUp.email
      }
    })
    if(clientExist) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.CONFLICT
      )
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(signUp.password,salt)

    const address = new Address(signUp.address)

    const organization = new Organization(signUp.organization)

    const client = new Client({...signUp, password:hash, role: "руководитель", address: address, organization: organization})

    await this.entityManager.save(client)
    return JSON.stringify("Пользователь зарегистрирован");
  }

}
