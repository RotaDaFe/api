import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SequelizeModule } from '@nestjs/sequelize';

import databaseConfig from './config/mariadb.config';
import { ConfigModule } from '@nestjs/config';
import { Pessoa } from './pessoa/entites/pessoa.entity';
import { PessoaController } from './pessoa/pessoa.controller';
import { PessoaService } from './pessoa/pessoa.service';
import { PessoaRepository } from './pessoa/pessoa.repository';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    SequelizeModule.forRootAsync({
      useFactory: databaseConfig,
    }),
  SequelizeModule.forFeature([Pessoa]),
  ],
  controllers: [AppController, PessoaController],
  providers: [  PessoaService, PessoaRepository]
})
export class AppModule {}
