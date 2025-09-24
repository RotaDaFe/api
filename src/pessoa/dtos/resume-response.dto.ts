import { ApiProperty } from '@nestjs/swagger';

export class ResumeEmailDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  total: number;
}

export class ResumeSexoDto {
  @ApiProperty()
  sexo: string;
  @ApiProperty()
  total: number;
}

export class ResumeFaixaEtariaDto {
  @ApiProperty()
  faixa: string;
  @ApiProperty()
  total: number;
}

export class ResumeResponseDto {
  @ApiProperty({
    type: [ResumeEmailDto],
    description: 'Total de cadastros por operador_email',
  })
  porEmail: ResumeEmailDto[];

  @ApiProperty({
    type: [ResumeSexoDto],
    description: 'Total de cadastros por sexo',
  })
  porSexo: ResumeSexoDto[];

  @ApiProperty({
    type: [ResumeFaixaEtariaDto],
    description: 'Total de cadastros por faixa etária',
  })
  porFaixaEtaria: ResumeFaixaEtariaDto[];
}
