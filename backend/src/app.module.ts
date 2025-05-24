import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { ProfilesModule } from './profile/profiles.module';

import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MoviesModule,
    PrismaModule,
    ProfilesModule,
    AuthModule,
   
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
