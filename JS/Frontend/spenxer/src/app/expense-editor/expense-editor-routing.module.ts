import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpenseEditorComponent } from './expense-editor.component';

const routes: Routes = [{ path: '', component: ExpenseEditorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseEditorRoutingModule { }
