import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Member } from 'src/entities/member';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelperModule } from 'src/utils/jwt/jwt.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Member]),
    JwtModule.register({}),
    JwtHelperModule,
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
