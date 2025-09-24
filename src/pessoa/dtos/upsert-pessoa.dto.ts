
import { IsArray, ValidateNested, IsString, IsUUID, IsInt, IsDateString, Min, MaxLength, IsEmail, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PessoaDto {
  @ApiProperty({ example: 'b1a2c3d4-e5f6-7890-1234-56789abcdef0' })
  @IsUUID()
  uuid: string;

  @ApiProperty({ example: 'João' })
  @IsString()
  @MaxLength(100)
  nome: string;

  @ApiProperty({ example: 25 })
  @IsInt()
  @Min(0)
  idade: number;

  @ApiProperty({ example: 'Belém' })
  @IsString()
  @MaxLength(100)
  cidade: string;

  @ApiProperty({ example: 'masculino', enum: ['masculino', 'feminino', 'outros'] })
  @IsString()
  @MaxLength(20)
  @IsIn(['masculino', 'feminino', 'outros'])
  sexo: string;

  @ApiProperty({ example: 'Unidade 1' })
  @IsString()
  @MaxLength(100)
  localatendimento: string;

  @ApiProperty({ example: 'Saudável' })
  @IsString()
  @MaxLength(100)
  condicaofisica: string;

  @ApiProperty({ example: 'Maria' })
  @IsString()
  @MaxLength(100)
  operador_nome: string;

  @ApiProperty({ example: 'maria@email.com' })
  @IsEmail()
  @MaxLength(100)
  operador_email: string;

  @ApiProperty({ example: '2025-09-24T12:00:00Z' })
  @IsDateString()
  datatime: Date;
}

export class UpsertPessoaDto {
  @ApiProperty({ type: [PessoaDto], description: 'Lista de pessoas para upsert' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PessoaDto)
  pessoas: PessoaDto[];
}
