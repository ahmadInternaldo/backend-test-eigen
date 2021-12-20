import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from 'src/entities/book';
import { History } from 'src/entities/history';
import { Member } from 'src/entities/member';
import { MemberBook } from 'src/entities/member-book';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([Member, MemberBook, Book, History]),
    JwtModule.register({})
  ],
  providers: [
    JwtStrategy
  ]
})
export class AuthModule {}
