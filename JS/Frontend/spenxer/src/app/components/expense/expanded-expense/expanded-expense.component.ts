import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Expense } from 'src/app/services/expense.service';

@Component({
  selector: 'app-expanded-expense',
  templateUrl: './expanded-expense.component.html',
  styleUrls: ['./expanded-expense.component.scss']
})
export class ExpandedExpenseComponent implements OnInit {

  expense!: Expense;

  constructor(@Inject(MAT_DIALOG_DATA) dialogData: any) {

    this.expense = dialogData.expense;

  }

  ngOnInit(): void {
  }

}
