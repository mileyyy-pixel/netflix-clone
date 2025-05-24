import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id.toString() }
    });
  }

  

  async create(email: string, password: string,  subscriptionPlan: string = 'standard') {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        subscriptionPlan,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.findByEmail(email);
    console.log('User:', user);
    if (user) {
      const isMatch =await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch); 
      if (isMatch) return user;
      
    }
    return null;
  }
}