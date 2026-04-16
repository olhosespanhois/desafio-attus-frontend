# Gerenciamento de Estado com NgRx (Feature To-do)

Implemente a estrutura de estado para uma lista de tarefas (To-do) utilizando os padrões recomendados do NgRx. A implementação deve incluir:

- Actions: Definir ações para: loadTodos, loadTodosSuccess, loadTodosError e toggleTodoComplete.
- Reducer: Implementar o estado inicial e a transição de estados usando createReducer, garantindo a tipagem forte do estado.
- Selectors: Criar seletores utilizando createSelector:
- selectAllTodos: Retorna a lista completa.
- selectPendingTodos: Retorna apenas as tarefas não concluídas.
- Effect: Criar um Effect que gerencie o fluxo assíncrono: ao disparar loadTodos, deve realizar uma chamada HTTP (mockada) e despachar a ação de sucesso ou erro conforme o resultado.
