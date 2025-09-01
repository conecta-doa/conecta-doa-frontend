# Conecta Doa Frontend

Este projeto é o frontend do Conecta Doa, uma aplicação web desenvolvida em Angular para facilitar a gestão e doação de recursos.

## Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar o Projeto](#como-rodar-o-projeto)
- [Scripts Disponíveis](#scripts-disponiveis)
- [Testes](#testes)
- [Contribuição](#contribuicao)
- [Licença](#licenca)

## Sobre o Projeto

O Conecta Doa é uma plataforma para conectar doadores e instituições, permitindo o cadastro de usuários, doações e gerenciamento de campanhas.

## Tecnologias Utilizadas

- [Angular](https://angular.io/)
- TypeScript
- HTML5 & CSS3
- Node.js & npm

## Estrutura de Pastas

```
conecta-doa-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── main.server.ts
│   ├── server.ts
│   ├── styles.css
│   └── app/
│       ├── app.config.ts
│       ├── app.config.server.ts
│       ├── app.html
│       ├── app.css
│       ├── app.ts
│       ├── app.routes.ts
│       ├── app.routes.server.ts
│       ├── app.spec.ts
│       ├── core/
│       │   └── services/
│       │       ├── auth.ts
│       │       ├── donation.ts
│       │       └── user.ts
│       └── features/
│           ├── dashboard/
│           │   └── components/dashboard-home/
│           ├── donations/
│           │   └── components/
│           │       ├── donation-form/
│           │       └── donation-list/
│           ├── login/
│           │   └── components/login-form/
│           └── users/
│               └── components/
│                   ├── user-form/
│                   └── user-list/
├── angular.json
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
└── README.md
```

- `core/services/`: Serviços reutilizáveis (ex: autenticação, usuários, doações)
- `features/`: Funcionalidades principais separadas por domínio
- `public/`: Arquivos estáticos

## Como Rodar o Projeto
0. Verifique se tem a última versão do  angular instalada em sua máquina com o comando:
    ```bash
        ng version
    ```
### OBS.: Comando para instalar o angular: 
    npm install -g @angular/cli


1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm start ou ng serve
   ```
3. Acesse em [http://localhost:4200](http://localhost:4200)

## Scripts Disponíveis

- `npm start`: Inicia o servidor de desenvolvimento
- `npm test`: Executa os testes unitários

## Testes

Para rodar os testes:

```bash
npm test
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça suas alterações e commit: `git commit -m 'feat: minha nova feature'`
4. Envie para o seu fork: `git push origin minha-feature`
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT.
