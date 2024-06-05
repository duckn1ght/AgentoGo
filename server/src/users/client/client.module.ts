import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { Address } from './entities/address.entity';
import { Organization } from './entities/organization.entity';
import { Requisities } from './entities/requisites.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Client, Address, Organization, Requisities])],
  controllers: [],
  providers: []
})
export class ClientsModule {}
