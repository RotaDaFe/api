import { Body, Controller, Post, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiExtraModels, ApiSecurity } from '@nestjs/swagger';
import { Pessoa } from './entites/pessoa.entity';
import { UpsertPessoaDto } from './dtos/upsert-pessoa.dto';
import { PessoaService } from './pessoa.service';
import { ResumeResponseDto, ResumeEmailDto, ResumeSexoDto, ResumeFaixaEtariaDto } from './dtos/resume-response.dto';
import { PessoaDto } from './dtos/upsert-pessoa.dto';
import { PasswordGuard } from 'src/guards/password.guard';

@ApiTags('Pessoa')
@ApiExtraModels(UpsertPessoaDto, PessoaDto)

@UseGuards(PasswordGuard)
@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) { }

  @Post('sync')
  @ApiSecurity('x-api-password')
  @ApiOperation({ summary: 'Sincronizar UUIDs de pessoas', description: 'Recebe um array de UUIDs e retorna quais não existem no banco.' })
  @ApiBody({ schema: { properties: { uuids: { type: 'array', items: { type: 'string' }, example: ['uuid1', 'uuid2'] } } } })
  @ApiResponse({ status: 200, description: 'UUIDs que não existem no banco', schema: { example: { missing: ['uuid1'] } } })
  async syncUuids(@Body('uuids') uuids: string[]): Promise<{ missing: string[] }> {
    if (!Array.isArray(uuids) || uuids.length === 0) {
      return { missing: uuids || [] };
    }
    const found = await Pessoa.findAll({
      where: { uuid: uuids },
      attributes: ['uuid'],
    });
    const foundUuids = found.map(p => p.uuid);
    const missing = uuids.filter(uuid => !foundUuids.includes(uuid));
    return { missing };
  }
  @Post('upsert-batch')
  @ApiSecurity('x-api-password')
  @ApiOperation({ summary: 'Upsert em lote de pessoas', description: 'Recebe um array de objetos pessoa e cadastra ou atualiza no banco pelo UUID.' })
  @ApiBody({ type: UpsertPessoaDto })
  @ApiResponse({ status: 200, description: 'Pessoas inseridas/atualizadas com sucesso.' })
  async upsertBatch(@Body() body: UpsertPessoaDto): Promise<{ upserted: string[] }> {
    const pessoas = body.pessoas;
    if (!Array.isArray(pessoas) || pessoas.length === 0) {
      return { upserted: [] };
    }
    const upserted = await this.pessoaService.upsertBatch(pessoas);
    return { upserted };
  }
  @Get('count-by-email')
  @ApiSecurity('x-api-password')
  @ApiOperation({ summary: 'Contar cadastros por email', description: 'Retorna a quantidade de pessoas cadastradas por operador_email.' })
  @ApiResponse({ status: 200, description: 'Lista de emails e total de cadastros', schema: { example: [{ email: 'exemplo@email.com', total: 5 }] } })
  async countByEmail(): Promise<ResumeEmailDto[]> {
    return this.pessoaService.countByOperadorEmail();
  }
  @Get('resume')
  @ApiSecurity('x-api-password')
  @ApiOperation({ summary: 'Resumo geral de cadastros', description: 'Retorna resumo com total por operador_email, sexo e grupos de idade.' })
  @ApiResponse({ status: 200, description: 'Resumo dos cadastros', type: ResumeResponseDto })
  async getResume(): Promise<ResumeResponseDto> {
    return this.pessoaService.getResumo();
  }
}
