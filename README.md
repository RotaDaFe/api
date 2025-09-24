# API Rota da Fe
> Projeto para fins acadêmicos e demonstração. Para produção, revise variáveis sensíveis e políticas de segurança.
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>
API desenvolvida em NestJS + Sequelize para cadastro, sincronização e análise de pessoas, com autenticação por header customizado.

## Funcionalidades

- Cadastro e atualização em lote de pessoas (`/pessoa/upsert-batch`)
- Sincronização de UUIDs (`/pessoa/sync`)
- Relatórios de cadastros por e-mail, sexo e faixa etária
- Proteção de rotas via header `x-api-password`
- Documentação interativa via Swagger

## Autenticação

Todas as rotas do controller `/pessoa` exigem o header:

```
x-api-password: SUA_SENHA_AQUI
```

A senha é definida pela variável de ambiente `API_PASSWORD` (ou padrão `SUA_SENHA_AQUI`).

## Documentação Swagger

Acesse `/api/docs` para visualizar e testar os endpoints. Clique em "Authorize" e informe a senha para autenticar.

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz com:

```
API_PASSWORD=SUA_SENHA_AQUI
# Outras variáveis do banco, etc
```

## Scripts principais

- `bun run start:dev` — inicia o servidor em modo desenvolvimento
- `bun run build` — build do projeto

## Estrutura principal

- `src/pessoa/` — controllers, DTOs, guards e serviços relacionados a pessoas
- `src/entites/` — entidades Sequelize
- `src/guards/` — guards de autenticação
- `netlify/functions/` — handler para deploy serverless

## Exemplo de payload para upsert-batch

```json
{
  "pessoas": [
    {
      "uuid": "b1a2c3d4-e5f6-7890-1234-56789abcdef0",
      "nome": "João",
      "idade": 25,
      "cidade": "Belém",
      "sexo": "masculino",
      "localatendimento": "Unidade 1",
      "condicaofisica": "Saudável",
      "operador_nome": "Maria",
      "operador_email": "maria@email.com",
      "datatime": "2025-09-24T12:00:00Z"
    }
  ]
}
```

---

## 🛠️ Tecnologias utilizadas
- [NestJS](https://nestjs.com/) — Framework Node.js progressivo.
- [Express](https://expressjs.com/) — Servidor HTTP usado pelo NestJS.
- [serverless-http](https://github.com/dougmoscrop/serverless-http) — Adapta Express para ambientes serverless.
- [Netlify Functions](https://docs.netlify.com/functions/overview/) — Funções serverless da Netlify.

---

## 📌 Observações
- Para adicionar novas rotas, crie novos **controllers** no `src/` e eles estarão automaticamente disponíveis sob o prefixo `/api/`.
- Para produção, o **Netlify** usará o arquivo `netlify/functions/nest.ts` como ponto de entrada.
- Se quiser mudar o prefixo `/api`, altere o `app.setGlobalPrefix()` no `netlify/functions/nest.ts` e o `netlify.toml`.

---