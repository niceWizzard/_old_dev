import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MoreSettingsComponent } from './components/more-settings/more-settings.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "more",
    component: MoreSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
