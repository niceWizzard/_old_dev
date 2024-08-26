import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpenseEditorRoutingModule } from './expense-editor-routing.module';
import { ExpenseEditorComponent } from './expense-editor.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { QuickCreateTagComponent } from './quick-create-tag/quick-create-tag.component';

@NgModule({
  declarations: [
    ExpenseEditorComponent,
    QuickCreateTagComponent
  ],
  imports: [
    CommonModule,
    ExpenseEditorRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
})
export class ExpenseEditorModule { }
