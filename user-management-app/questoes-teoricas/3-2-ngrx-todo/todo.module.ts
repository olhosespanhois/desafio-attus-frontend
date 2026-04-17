import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TodoEffects } from './todo.effects';
import { todoReducer } from './todo.reducer';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('todos', todoReducer),
    EffectsModule.forFeature([TodoEffects]),
  ],
})
export class TodoStateModule {}
