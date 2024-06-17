import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Address } from './entities/address.entity';
import { Organization } from './entities/organization.entity';
import { Requisities } from './entities/requisites.entity';
import { AuthHistory } from './entities/auth-history.entity';


@Module({
  imports: [TypeOrmModule.forFeature([User, Address, Organization, Requisities, AuthHistory])],
  controllers: [],
  providers: []
})
export class UsersModule {}
