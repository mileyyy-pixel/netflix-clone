import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiles')
@UseGuards(JwtAuthGuard)
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  async findAll(@Request() req) {
    // Make sure this uses sub, which is what we're returning from JwtStrategy
    return this.profilesService.findAllByUserId(req.user.sub);
  }
  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const profile = await this.profilesService.findById(id);
    if (!profile || profile.userId !== req.user.sub) {
      throw new UnauthorizedException('Access denied');
    }
    return profile;
  }
  @Post()
  async create(
    @Request() req,
    @Body()
    data: {
      name: string;
      avatarUrl?: string;
      isKidsProfile: boolean;
    },
  ) {
    return this.profilesService.create({
      ...data,
      userId: req.user.sub,
    });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    data: {
      name?: string;
      avatarUrl?: string;
      isKidsProfile?: boolean;
    },
  ) {
    return this.profilesService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.profilesService.delete(id);
  }

  @Post(':id/watchlist')
  async addToWatchlist(
    @Param('id') profileId: string,
    @Body() data: { contentId: string },
  ) {
    return this.profilesService.addToWatchlist(profileId, data.contentId);
  }

  @Get(':id/watchlist')
  async getWatchlist(@Param('id') profileId: string) {
    return this.profilesService.getWatchlist(profileId);
  }

  @Delete(':id/watchlist/:contentItemId')
  async removeFromWatchlist(
    @Param('id') profileId: string,
    @Param('contentItemId') contentItemId: string,
  ) {
    return this.profilesService.removeFromWatchlist(profileId, contentItemId);
  }

  @Post(':id/watch-history')
  async updateWatchHistory(
    @Param('id') profileId: string,
    @Body()
    data: {
      contentId: string;
      watchedDuration: number;
      completed: boolean;
    },
  ) {
    return this.profilesService.updateWatchHistory(
      profileId,
      data.contentId,
      data.watchedDuration,
      data.completed,
    );
  }

  @Get(':id/continue-watching')
  async getContinueWatching(@Param('id') profileId: string) {
    return this.profilesService.getContinueWatching(profileId);
  }
}