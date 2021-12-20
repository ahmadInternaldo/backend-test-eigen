import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/utils/auth/jwt-auth.guard';
import { OneUserLoginGuard } from 'src/utils/auth/one-user-login-auth.guard';
import { BookDto, MemberBookDto } from './dto/book.dto';
import { MemberService } from './member.service';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, OneUserLoginGuard)
@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async getAll(): Promise<any> {
    return this.memberService.getAll();
  }

  @Post('borrow')
  async borrow(@Req() req, @Body() bookDto: BookDto): Promise<any> {
    return this.memberService.borrow(req.user.id, bookDto.bookId);
  }

  @Get('member-detail')
  async getMemberDetail(@Req() req): Promise<any> {
    return this.memberService.getMemberDetail(req.user.id);
  }

  @Post('return')
  async return(@Body() memberBookDto: MemberBookDto): Promise<any> {
    return this.memberService.return(memberBookDto.memberBookId);
  }
}
