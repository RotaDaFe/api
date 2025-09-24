import { Injectable } from '@nestjs/common';
import { PessoaDto } from './dtos/upsert-pessoa.dto';
import { PessoaRepository } from './pessoa.repository';

@Injectable()
export class PessoaService {
  constructor(private readonly pessoaRepository: PessoaRepository) {}

  async upsertBatch(pessoas: PessoaDto[]): Promise<string[]> {
    return this.pessoaRepository.upsertMany(pessoas);
  }

  async countByOperadorEmail(): Promise<{ email: string; total: number }[]> {
    return this.pessoaRepository.countByOperadorEmail();
  }

  async getResumo() {
    const [porEmail, porSexo, porFaixaEtaria] = await Promise.all([
      this.pessoaRepository.countByOperadorEmail(),
      this.pessoaRepository.countBySexo(),
      this.pessoaRepository.countByFaixaEtaria(),
    ]);
    return {
      porEmail,
      porSexo,
      porFaixaEtaria,
    };
  }
}
