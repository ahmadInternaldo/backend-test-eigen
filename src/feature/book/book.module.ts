import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Book } from 'src/entities/book';
import { Member } from 'src/entities/member';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Book, Member]),
    JwtModule.register({})
  ],
  controllers: [BookController],
  providers: [BookService]
})
export class BookModule {}
