import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/client/client.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal:true}),DatabaseModule, UsersModule, AuthenticationModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
