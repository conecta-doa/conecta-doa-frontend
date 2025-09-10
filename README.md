## Requisitos

- Angular v20
- [Git](https://git-scm.com/downloads)
- Uma IDE (VSCode, Visual Studio, etc)

## 1- Clone o projeto

- Na sua IDE, faça o seguinte comando

```bash
git clone https://github.com/conecta-doa/conecta-doa-frontend.git
```

## 2 - Verifique atualizações

- Essa parte é bem importante, esporádicamente rode:

```bash
# Esse comando fará a verificação de novas mudanças (seja branchs, commits e etc)
git fetch
```

- Caso tenha algo para atualizar rode:

```bash
# Esse comando trará as atualizações para a sua branch local
git pull
```

## 3 - Crie a sua branch

- Crie a sua branch para desenvolvimento a partir da master
- Por favor, siga este padrão tipo-de-branch/nome-enxuto-do-que-foi-desenvolvido
- Ex:

```bash
# Para criar a sua branch
git branch feature/update-readme


# Para selecionar a branch criada
git checkout feature/update-readme




git branch fix/ajuste-no-login


git checkout fix/ajuste-no-login




git branch chore/atualizacao-dependencias


git checkout chore/atualizacao-dependencias
```

## 4 - Commits

- Quando criar/modificar/deletar algo é necessário salvar na branch, para isso usamos:

```bash
# Adiciona as mudanças
git add .
```

```bash
git commit -m "mensagem que diz o que mudou"
```

## 5 - Push

- Quando finalmente acreditar que terminou faça o push para atualizar no GitHub

```bash
git push origin nome-da-sua-branch
```

## Tipos de branches

### 🔹 `main` (ou `master`)

- **O que é:** branch principal do projeto.
- **Uso:** contém apenas código estável e pronto para produção.
- **Quem altera:** somente via Pull Request revisada.

---

### 🔹 `feature/*`

- **O que é:** branch para novas funcionalidades.
- **Uso:** cada nova feature deve ser criada a partir da `develop`.
- **Padrão de nome:**
  - `feature/nome-da-funcionalidade`
  - Ex.: `feature/cadastro-usuario`, `feature/integracao-pagamentos`.

---

### 🔹 `fix/*`

- **O que é:** branch para corrigir bugs.
- **Uso:** utilizada quando for corrigir problemas detectados no código.
- **Padrão de nome:**
  - `fix/descricao-do-bug`
  - Ex.: `fix/erro-login`, `fix/carrinho-vazio`.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
