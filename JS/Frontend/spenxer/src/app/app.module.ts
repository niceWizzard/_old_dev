import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecentExpensesComponent } from './components/recent-expenses/recent-expenses.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { ExpenseComponent } from './components/expense/expense.component';
import { ExpandedExpenseComponent } from './components/expense/expanded-expense/expanded-expense.component';
import { DropdownLinkComponent } from './components/header/dropdown-link/dropdown-link.component';
import { ReadableDatePipe } from './pipes/readable-date.pipe'


@NgModule({
  declarations: [
    AppComponent,
    RecentExpensesComponent,
    HeaderComponent,
    ExpenseComponent,
    ExpandedExpenseComponent,
    DropdownLinkComponent,
    ReadableDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
