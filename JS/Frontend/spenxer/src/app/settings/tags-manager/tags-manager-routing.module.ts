import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TagsManagerComponent } from './tags-manager.component';

const routes: Routes = [{ path: '', component: TagsManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagsManagerRoutingModule { }
