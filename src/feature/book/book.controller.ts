import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';
import { OneUserLoginGuard } from 'src/utils/auth/one-user-login-auth.guard';
import { BookService } from './book.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OneUserLoginGuard)
@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {
  }

  @Get()
  async getAll(): Promise<any> {
    return this.bookService.getAll()
  }
}
