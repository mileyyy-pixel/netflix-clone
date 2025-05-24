import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ProfilesController],
  providers: [ProfilesService, PrismaService],
  exports: [ProfilesService],
})
export class ProfilesModule {}