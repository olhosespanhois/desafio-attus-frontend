# 🚀 Desafio Attus Frontend

![Angular](https://img.shields.io/badge/Angular-17%252B-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![NgRx](https://img.shields.io/badge/NgRx-17.x-purple)
![RxJS](https://img.shields.io/badge/RxJS-7.x-rose)
![Jest](https://img.shields.io/badge/tests-Jest-green)

## 📋 Sobre o Projeto

Este repositório contém a solução completa para o teste técnico da Attus Procuradoria Digital para a posição de Desenvolvedor Front-end Angular.

O desafio avalia conhecimentos em:

- TypeScript e boas práticas
- Angular (Change Detection, RxJS, Performance)
- Gerenciamento de estado (Signals e NgRx)
- Desenvolvimento de aplicação completa com Angular Material

## 📁 Estrutura do Repositório

```
desafio-attus-frontend/
├── README.md
└── user-management-app/ # Projeto Angular principal - Desafio Prático
    ├── questoes-teoricas/ # Respostas das questões teóricas
    │    ├── 1.1-refatoracao.ts
    │    ├── 1.2-generics-paginacao.ts
    │    ├── 2.1-change-detection.ts
    │    ├── 2.2-rxjs-mergeMap.ts
    │    ├── 2.3-rxjs-debounce-search.ts
    │    ├── 2.4-trackby-onpush.md
    │    ├── 3.1-signals-carrinho/
    │    │   ├── carrinho.component.ts
    │    │   └── carrinho.component.spec.ts
    │    └── 3.2-ngrx-todo/
    │        ├── todo.actions.ts
    │        ├── todo.reducer.ts
    │        ├── todo.selectors.ts
    │        └── todo.effects.ts
    ├── src/
    │ ├── app/
    │ │ ├── core/
    │ │ │ ├── services/
    │ │ │ └── interceptors/
    │ │ ├── features/
    │ │ │ └── users/
    │ │ │ ├── components/
    │ │ │ │ ├── user-card/
    │ │ │ │ ├── user-form-modal/
    │ │ │ │ └── user-list/
    │ │ │ ├── services/
    │ │ │ ├── store/
    │ │ │ └── models/
    │ │ ├── shared/
    │ │ │ ├── validators/
    │ │ │ └── directives/
    │ │ └── app.config.ts
    │ ├── assets/
    │ └── environments/
    ├── package.json
    └── angular.json

```

---

## 📝 Questões Respondidas

### 1. TypeScript e Qualidade de Código

**1.1** Refatoração :arrow_right: [1.1-refatoracao.ts](https://github.com/olhosespanhois/desafio-attus-frontend/blob/main/user-management-app/questoes-teoricas/1-1-refatoracao.ts)

**1.2** Generics e Tipos Utilitários :arrow_right: [1.2-generics-paginacao.ts](https://github.com/olhosespanhois/desafio-attus-frontend/blob/main/user-management-app/questoes-teoricas/1-2-generics-paginacao.ts)

### 2. Angular — Fundamentos e Reatividade

**2.1** Change Detection e OnPush :arrow_right: [2.1-change-detection.ts](https://github.com/olhosespanhois/desafio-attus-frontend/blob/main/user-management-app/questoes-teoricas/2-1-change-detection.ts)

**2.2** RxJS — eliminando subscriptions aninhadas :arrow_right: [2.2-rxjs-mergeMap.ts](https://github.com/olhosespanhois/desafio-attus-frontend/blob/main/user-management-app/questoes-teoricas/2-2-rxjs-mergeMap.ts)

**2.3** RxJS — busca com debounce :arrow_right: [2.3-rxjs-debounce-search.ts](https://github.com/olhosespanhois/desafio-attus-frontend/tree/main/user-management-app/questoes-teoricas/2-3-rxjs-debounce-search)

**2.4** Performance — OnPush e trackBy :arrow_right: [2.4-trackby-onpush.md](https://github.com/olhosespanhois/desafio-attus-frontend/blob/main/user-management-app/questoes-teoricas/2-4-trackby-onpush.md)

### 3. Gerenciamento de Estado

**3.1** Angular Signals — Carrinho :arrow_right: [3.1-signals-carrinho](https://github.com/olhosespanhois/desafio-attus-frontend/tree/main/user-management-app/questoes-teoricas/3-1-signals-carrinho)

**3.2** NgRx — Feature To-do :arrow_right: [3.2-ngrx-todo](https://github.com/olhosespanhois/desafio-attus-frontend/tree/main/user-management-app/questoes-teoricas/3-2-ngrx-todo)

### 4. Desafio Prático — Aplicação de Usuários

**🛠️ Tecnologias Utilizadas**

- Framework Angular 17+ (Standalone Components)
- UI Library Angular Material
- State Management NgRx (Store, Effects) + Signals
- Reactivity RxJS 7.x
- Testing Jest
- Validation Reactive Forms + Custom Validators
- HTTP Client Angular HttpClient (mock interceptors)

#### ▶️ Como Executar o Projeto

**Pré-requisitos:**

- bash
- Node.js (v18+)
- npm (v9+) ou yarn
- Angular CLI (v17+)

#### :clipboard: Passos

##### 1. Clone o repositório

```
git clone https://github.com/olhosespanhois/desafio-attus-frontend.git

cd desafio-attus-frontend/user-management-app
```

##### 2. Instale as dependências

> npm install

##### 3. Execute a aplicação

> ng serve

##### 4. Acesse no navegador

> http://localhost:4200

##### 5. Testes unitários

> ng test

#### 📦 Scripts Disponíveis

```json
{
  "ng": "ng",
  "start": "ng serve",
  "build": "ng build",
  "watch": "ng build --watch --configuration development",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

---

## 👩‍💻 Autora

**Samira Bittar**

[![Github](https://img.shields.io/badge/GitHub-olhosespanhois-black)](https://github.com/olhosespanhois/)

### 📄 Licença

Este projeto foi desenvolvido como parte do processo seletivo da Attus Procuradoria Digital. Todos os direitos reservados.

### 🙏 Agradecimentos

Agradeço à equipe da Attus Procuradoria Digital pela oportunidade de participar deste desafio técnico. Foi uma excelente oportunidade para demonstrar conhecimentos em Angular, TypeScript, RxJS e boas práticas de desenvolvimento front-end.

⭐ Se este repositório foi útil para você, considere deixar uma estrela!
