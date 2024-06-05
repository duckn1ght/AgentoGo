import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'src/users/client/entities/client.entity';


@Module({
  imports:[TypeOrmModule.forFeature([Client ])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
