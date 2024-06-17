import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Requisities } from 'src/users/entities/requisites.entity';
import { Organization } from 'src/users/entities/organization.entity';
import { Address } from 'src/users/entities/address.entity';


@Module({
  imports:[TypeOrmModule.forFeature([User, Requisities, Organization, Address ])],
  controllers: [ProfileController],
  providers: [ProfileService]
})
export class ProfileModule {}
