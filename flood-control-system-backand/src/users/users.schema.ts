import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export interface UserDocument extends Document {
  login: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

// UserSchema.pre<UserDocument>('save', async function (next) {
//   if (this.isModified('password') || this.isNew) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

// UserSchema.methods.comparePassword = async function (
//   this: UserDocument,
//   candidatePassword: string,
// ): Promise<boolean> {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch {
//     throw new Error('Password comparison failed'); // Обработка ошибок
//   }
// };
