import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginService } from './login.service';

@ApiTags('Login')
@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {
    
  }
  @Post()
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<any> {
    return this.loginService.login(loginDto)
  }

}
