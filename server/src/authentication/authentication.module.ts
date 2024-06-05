import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {JwtModule} from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './authentication.guard';
import { Client } from 'src/users/client/entities/client.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Client]),
          JwtModule.registerAsync({
            useFactory: (configService: ConfigService) =>({
              global: true,
              secret: configService.getOrThrow('JWT_SECRET_KEY'),
              signOptions: {expiresIn: '12h'}
            }),
            inject: [ConfigService]
          })
        ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AuthenticationModule {}
