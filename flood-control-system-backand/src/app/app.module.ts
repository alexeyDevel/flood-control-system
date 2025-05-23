import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './services/app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import * as process from 'process';
import * as dotenv from 'dotenv';
import { ProcessService } from './services/process.service';

dotenv.config();

@Module({
  imports: [
    FilesModule,
    UsersModule,
    PassportModule,
    AuthModule,
    MongooseModule.forRoot(process.env.FCS_DATABASE_LINK ?? ''),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ProcessService],
})
export class AppModule {}
