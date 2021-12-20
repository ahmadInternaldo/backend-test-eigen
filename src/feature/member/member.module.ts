import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Member } from 'src/entities/member';
import { MemberBook } from 'src/entities/member-book';
import { History } from 'src/entities/history';
import { Book } from 'src/entities/book';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Member, MemberBook, Book,History]),
    JwtModule.register({})
  ],
  controllers: [MemberController],
  providers: [MemberService]
})
export class MemberModule {}
