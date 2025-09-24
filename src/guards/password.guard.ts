import { CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export class PasswordGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const senha = request.headers['x-api-password'] || request.headers['x-api-password'.toLowerCase()];
    const senhaEnv = process.env.API_PASSWORD;
    if (senha === senhaEnv) {
      return true;
    }
    throw new UnauthorizedException('Senha inválida');
  }
}
