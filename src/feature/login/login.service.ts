import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from 'src/entities/member';
import { JwtHelperService } from 'src/utils/jwt/jwt.service';
import {
  invalidCodeName,
  successConstant,
} from 'src/utils/constants/error.constants';
import { FilterException } from 'src/utils/exceptions/filter-exception';
import { LoginDto, ResponseLoginDto } from './dto/login.dto';

@Injectable()
export class LoginService extends JwtHelperService {
  @InjectModel(Member)
  private memberRepo: typeof Member;

  async login(loginDto: LoginDto): Promise<ResponseLoginDto> {
    try {
      let member = await this.memberRepo.findOne({
        where: {
          name: loginDto.name,
          code: loginDto.code,
        },
      });
      if (!member) {
        throw new NotFoundException(invalidCodeName);
      }

      const { id, name, code } = member;

      const payload = {
        id,
        name,
        code,
      };
      const token = await this.signAsync(payload);
      member.token = token;

      await this.memberRepo.update({token}, {
        where: {
          id: member.id,
        },
      });

      return {
        ...successConstant,
        token,
      };
    } catch (error) {
      throw new FilterException(error)
    }
  }
}
