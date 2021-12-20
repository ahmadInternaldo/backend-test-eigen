import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoginModule } from './feature/login/login.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from './entities/book';
import { MemberBook } from './entities/member-book';
import { Member } from './entities/member';
import { MemberModule } from './feature/member/member.module';
import { BookModule } from './feature/book/book.module';
import { AuthModule } from './utils/auth/auth.module';
import { JwtHelperModule } from './utils/jwt/jwt.module';
import { History } from './entities/history';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port: +process.env.PORT,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [Book, MemberBook, Member, History],
      synchronize: false,
      sync: {
        alter: false
      },
      autoLoadModels: false
    }),
    LoginModule,
    MemberModule,
    BookModule,
    AuthModule,
    JwtHelperModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
