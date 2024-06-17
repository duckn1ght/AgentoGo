import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Address } from 'src/users/entities/address.entity';
import { Organization } from 'src/users/entities/organization.entity';
import { EmailService } from './email.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { AuthHistory } from 'src/users/entities/auth-history.entity';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { POSITION } from 'src/users/types/user-types';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(AuthHistory)
    private readonly authHistoryRepository: Repository<AuthHistory>,
    private readonly entityManager: EntityManager,
    private jwtService: JwtService,
    private emailService: EmailService
  ){}

  async signIn(signInDto: SignInDto) {
    const user = await this.userRepository.findOne({
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
    
    const authHistory = new AuthHistory({
      authDate: signInDto.date,
      authPoint: signInDto.authPoint,
      authManager: signInDto?.authManager || "",
      user: user
    })

    await this.authHistoryRepository.save(authHistory)

    const payload:TokenData = {id:user.id}
    const token = await this.jwtService.signAsync(payload)

    return JSON.stringify(token);
  }
  async signUp(signUp: CreateUserDto) {
    const userExist = await this.userRepository.count({
      where:{
        email: signUp.email
      }
    })
    if(userExist) {
      throw new HttpException(
        'Пользователь с таким email уже существует',
        HttpStatus.CONFLICT
      )
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(signUp.password,salt)

    const address = new Address(signUp.address)

    const organization = new Organization({
      ...signUp.organization,
      name: "",
      imgUrl: ""
    })
    
    const user = new User(
      {...signUp, 
        password:hash,
        passwordChangeDate: signUp.passwordChangeDate, 
        role: signUp.role, 
        poisiton: POSITION.LEADER,
        address: address, 
        organization: organization,
        authHistories: null, 
        requisities: null
      }
    )

    await this.entityManager.save(user)
    return JSON.stringify("Пользователь зарегистрирован");
  }

  async requestPasswordReset(forgotPasswordDto:ForgotPasswordDto){
    const user = await this.userRepository.findOne({
      where:{
        email: forgotPasswordDto.email
      }
    })

    if(!user) throw new HttpException("Пользователя с таким email не существует", HttpStatus.FORBIDDEN)

    const payload:TokenData = {id:user.id}
    const token = await this.jwtService.signAsync(payload)

    const response = await this.emailService.sendResetPasswordEmail(forgotPasswordDto.email, token)
    return JSON.stringify(response)
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto){
    const userCypher = await this.jwtService.decode(resetPasswordDto.token)
    const user = await this.userRepository.findOne({
      where:{
        id: userCypher.id
      }
    })
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(resetPasswordDto.password,salt)
    await this.userRepository.update(user.id, {
      password: hash,
      passwordChangeDate: new Date().toISOString()
    })

    return JSON.stringify("Пароль был изменен")
  }

}
