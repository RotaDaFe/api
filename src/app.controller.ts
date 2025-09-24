import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {

  @Get('health')
  @ApiOperation({ summary: 'Verifica saúde da API' })
  @ApiResponse({ status: 200, description: 'API está rodando.' })
  getHeath() {
    return { status: 'up' };
  }
}
