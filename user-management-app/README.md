# UserManagementApp

## O que construir

Reproduzir o protótipo de uma listagem de usuários. A listagem deverá ter as seguintes funcionalidades:

1. Tela de listagem de usuários
2. Listagem de usuários

- Cards com os campos: nome, e-mail e botão de editar
- Filtro por nome com debounce de 300ms
- Estado de loading durante o carregamento e mensagem de erro em caso de falha
- Os dados podem vir de uma API mockada (JSON Server, MSW ou array estático em serviço)

1. Modal de cadastro de novo usuário com abertura através do botão vermelho que aparece na listagem,criação e edição de usuário (em modal)

- cpf (obrigatório), telefone (obrigatório) e tipo de telefone.
- Validação com mensagens de erro por campo
- Botão de salvar desabilitado enquanto o formulário estiver inválido
- Quando for edição o formulário deve ser preenchido automaticamente

---

## Requisitos técnicos

- Pelo menos 2 operadores RxJS além de map e tap em uso real (ex: switchMap, forkJoin, catchError, debounceTime)
- Componentes standalone
- Subscriptions gerenciadas sem memory leaks (takeUntilDestroyed, take, async pipe ou unsubscribe manual no ngOnDestroy)
- Cobertura de testes acima de 60% (Preferencialmente usando Vitest ou Jest)

---

## Diferenciais (não obrigatórios)

- Nx Monorepo com separação em bibliotecas (ex: feature-users, data-access-users, ui)
- Paginação na listagem
- Validação de formato dos dados do formulário (e-mail,cpf e telefone)
- Melhorias no projeto em relação a tela apresentada no protótipo

---

## Sobre

"Este projeto foi gerado com Angular CLI versão 17.3.17.

### Servidor de desenvolvimento

Rode ng serve para iniciar o servidor de desenvolvimento. Acesse `http://localhost:4200/`. O aplicativo será recarregado automaticamente se você alterar qualquer arquivo fonte.

### Gerando código

Rode `ng generate component nome-do-componente` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Rode `ng build` para compilar o projeto. Os artefatos da compilação ficarão armazenados no diretório dist/.

### Executando testes unitários

Rode `ng test` para executar os testes unitários via Karma.

### Executando testes end-to-end

Rode ng e2e para executar os testes end-to-end através de uma plataforma de sua escolha. Para usar este comando, você precisa primeiro adicionar um pacote que implemente funcionalidades de testes end-to-end.

## Mais ajuda

Para obter mais ajuda sobre o Angular CLI, use `ng help` ou acesse a página Visão geral e referência de comandos do Angular CLI."

---

**Obs.:** Infelizmente, não consegui terminar o teste técnico, questão 4, por conta de problemas técnicos (travamento de máquina). Reitero meu interesse na vaga e fico à disposição para realizar uma nova tentativa, caso seja possível e de interesse da empresa.
