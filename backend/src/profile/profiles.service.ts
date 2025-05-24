import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}

  async findAllByUserId(userId: string) {
    return this.prisma.profile.findMany({
      where: { userId },        
    });
  }

  async findById(id: string) {
    return this.prisma.profile.findUnique({
      where: { id },
    });
  }

  async create(data: {
    name: string;
    avatarUrl?: string;
    isKidsProfile: boolean;
    userId: string; 
  }) {
    return this.prisma.profile.create({ 
      data,
    });
  }

  async update(
    id: string,
    data: {
      name?: string;
      avatarUrl?: string;
      isKidsProfile?: boolean;
    },
  ) {
    return this.prisma.profile.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.profile.delete({
      where: { id },
    });
  }

  async addToWatchlist(profileId: string, contentId: string) {
    // First, get or create a content item
    const contentItem = await this.prisma.contentItem.create({
      data: {
        contentId,
        profiles: {
          connect: { id: profileId },
        },
      },
    });

    return contentItem;
  }

  async getWatchlist(profileId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        watchlist: {
          include: {
            content: true,
          },
        },
      },
    });

    return profile?.watchlist || [];
  }

  async removeFromWatchlist(profileId: string, contentItemId: string) {
    return this.prisma.contentItem.update({
      where: { id: contentItemId },
      data: {
        profiles: {
          disconnect: { id: profileId },
        },
      },
    });
  }

  async updateWatchHistory(
    profileId: string,
    contentId: string,
    watchedDuration: number,
    completed: boolean,
  ) {
    // Try to find existing watch history
    const existingHistory = await this.prisma.watchHistory.findFirst({
      where: {
        profileId,
        contentId,
      },
    });

    if (existingHistory) {
      // Update existing entry
      return this.prisma.watchHistory.update({
        where: { id: existingHistory.id },
        data: {
          watchedDuration,
          completed,
          watchedAt: new Date(), // Update the watched time
        },
      });
    } else {
      // Create new entry
      return this.prisma.watchHistory.create({
        data: {
          profileId,
          contentId,
          watchedDuration,
          completed,
        },
      });
    }
  }

  async getContinueWatching(profileId: string) {
    return this.prisma.watchHistory.findMany({
      where: {
        profileId,
        completed: false,
      },
      include: {
        content: true,
      },
      orderBy: {
        watchedAt: 'desc',
      },
      take: 10, // Limit to recent 10 items
    });
  }
}