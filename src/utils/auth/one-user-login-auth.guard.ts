import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Member } from 'src/entities/member';
import {
  kickOutAccount,
  sessionTokenExpiredErrorConstant,
} from 'src/utils/constants/error.constants';
import { FilterException } from 'src/utils/exceptions/filter-exception';

@Injectable()
export class OneUserLoginGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,

    @InjectModel(Member)
    private readonly memberRepo: typeof Member,
  ) {}
  async canActivate(context: ExecutionContext) {
    try {
      const headers = context.switchToHttp().getRequest().headers;
      const checkKickOutAccount = await this.memberRepo.findOne({
        where: {
          token: headers.authorization.replace(/Bearer /g, ''),
        },
      });
      const loginData = await this.jwtService.verifyAsync(
        headers.authorization.replace(/Bearer /g, ''),
        {
          secret: process.env.SECRET_KEY,
        },
      );

      if (loginData.exp < Math.floor(new Date().getTime() / 1000)) {
        throw new ForbiddenException(sessionTokenExpiredErrorConstant);
      } else if (!checkKickOutAccount) {
        throw new ForbiddenException(kickOutAccount);
      } else {
        return true;
      }
    } catch (err) {
      throw new FilterException(err);
    }
  }
}
