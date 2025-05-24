import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ProfilesService } from '../profile/profiles.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private profilesService: ProfilesService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.usersService.validateUser(email, password);
    if (!user) {
      return null;
    }

    // Get profiles for this user
    const profiles = await this.profilesService.findAllByUserId(user.id);
  
    
    return {
      accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
      user: {
        id: user.id,
        email: user.email,
        profiles,
        
      }
    };
  }

  async signup(email: string, password: string, plan: string = 'standard') {
    // Check if user exists
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    // Create user
    const user = await this.usersService.create(email, password,plan);
    
    // Create a default profile

    const defaultProfile = await this.profilesService.create({
      name: 'Main Profile',
      avatarUrl: '/avatars/default.png',
      isKidsProfile: false,
      userId: user.id,
    });

    const profiles = [defaultProfile];



    // Return token
    return {
      accessToken: this.jwtService.sign({ sub: user.id, email: user.email }),
      user: {
        id: user.id,
        email: user.email,
        profiles,
        subscriptionPlan: plan

      }
    };
  }
}