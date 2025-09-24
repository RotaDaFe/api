import { Pessoa } from './entites/pessoa.entity';

export class PessoaRepository {
  async upsertMany(pessoas: Partial<Pessoa>[]): Promise<string[]> {
    const upserted: string[] = [];
    for (const pessoa of pessoas) {
      await Pessoa.upsert({ ...pessoa });
      upserted.push(pessoa.uuid);
    }
    return upserted;
  }

  async countByOperadorEmail(): Promise<{ email: string; total: number }[]> {
    const result = await Pessoa.findAll({
      attributes: [
        'operador_email',
        [Pessoa.sequelize!.fn('COUNT', Pessoa.sequelize!.col('operador_email')), 'total']
      ],
      group: ['operador_email'],
    });
    return result.map((r: any) => ({
      email: r.operador_email,
      total: Number(r.get('total')),
    }));
  }

  async countBySexo(): Promise<{ sexo: string; total: number }[]> {
    const result = await Pessoa.findAll({
      attributes: [
        'sexo',
        [Pessoa.sequelize!.fn('COUNT', Pessoa.sequelize!.col('sexo')), 'total']
      ],
      group: ['sexo'],
    });
    return result.map((r: any) => ({
      sexo: r.sexo,
      total: Number(r.get('total')),
    }));
  }

  async countByFaixaEtaria(): Promise<{ faixa: string; total: number }[]> {
    // Faixas: 0-12, 13-18, 19-29, 30-59, 60+
    const query = `
      SELECT
        CASE
          WHEN idade BETWEEN 0 AND 12 THEN '0-12'
          WHEN idade BETWEEN 13 AND 18 THEN '13-18'
          WHEN idade BETWEEN 19 AND 29 THEN '19-29'
          WHEN idade BETWEEN 30 AND 59 THEN '30-59'
          WHEN idade >= 60 THEN '60+'
          ELSE 'N/A'
        END as faixa,
        COUNT(*) as total
      FROM pessoa
      GROUP BY faixa
      ORDER BY faixa
    `;
    const [results] = await Pessoa.sequelize!.query(query);
    return (results as any[]).map(r => ({ faixa: r.faixa, total: Number(r.total) }));
  }
}
