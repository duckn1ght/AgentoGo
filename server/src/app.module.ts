import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/user.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileModule } from './profile/profile.module';
import { EmailModule } from './authentication/email.module';
import { ImagesModule } from './images/images.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal:true}),DatabaseModule, UsersModule, AuthenticationModule, ProfileModule, EmailModule, ImagesModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
