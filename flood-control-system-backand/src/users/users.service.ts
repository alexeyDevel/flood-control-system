import { Injectable } from '@nestjs/common';
import { UserDocument } from './users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    const existingUser = await this.findUserByLogin(login);
    if (existingUser) {
      throw new Error('User with this login already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      login,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async findUserByLogin(login: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ login }).exec();
  }

  async findUserById(_id: string): Promise<UserDocument | null> {
    if (!Types.ObjectId.isValid(_id)) {
      return null;
    }
    return await this.userModel.findById(_id).exec();
  }
}
