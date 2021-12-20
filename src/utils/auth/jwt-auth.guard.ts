import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import {
  unauthorizedErrorConstant,
} from 'src/utils/constants/error.constants';
import { IS_PUBLIC_KEY } from 'src/utils/decorators/public.decorator';
import { FilterException } from 'src/utils/exceptions/filter-exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }else {
      return super.canActivate(context);
    }
  }

  handleRequest(err: any, user: any) {
    try {
      if (err || !user) {
        throw err || new UnauthorizedException(unauthorizedErrorConstant);
      }

      return user;
    } catch (error) {
      throw new FilterException(error);
    }
  }
}
