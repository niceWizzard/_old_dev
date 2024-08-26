import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RecentExpensesComponent } from './components/recent-expenses/recent-expenses.component';

const routes: Routes = [
  {
    path: '',
    component: RecentExpensesComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'expense/edit/:id',
    loadChildren: () =>
      import('./expense-editor/expense-editor.module').then(
        (m) => m.ExpenseEditorModule
      ),
  },
  { path: 'settings', loadChildren: () => import('./settings/settings.module').then(m => m.SettingsModule) },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
