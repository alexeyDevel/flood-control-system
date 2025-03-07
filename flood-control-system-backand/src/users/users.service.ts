import { Injectable } from '@nestjs/common';
import { UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type TUser = {
  userId: string;
  login: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(login: string, password: string): Promise<UserDocument> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new this.userModel({ login, password: hashedPassword });
    return newUser.save();
  }

  async findUserByLogin(login: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ login }).exec();
  }
}
