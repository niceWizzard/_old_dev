import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagsManagerRoutingModule } from './tags-manager-routing.module';
import { TagsManagerComponent } from './tags-manager.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    TagsManagerComponent
  ],
  imports: [
    CommonModule,
    TagsManagerRoutingModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class TagsManagerModule { }
