import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [],
  providers: []
})
export class ClientsModule {}