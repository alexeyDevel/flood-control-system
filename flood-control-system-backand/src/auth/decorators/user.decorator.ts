import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUser } from '../jwt-user.type';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): JwtUser => {
    const request = ctx.switchToHttp().getRequest<{ user: JwtUser }>(); // Типизируем запрос
    return request.user; // Теперь TypeScript знает, что user имеет тип JwtUser
  },
);
