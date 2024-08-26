import { Component, OnInit } from '@angular/core';
import { List } from 'immutable';
import { Observable } from 'rxjs';
import { Expense, ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-recent-expenses',
  templateUrl: './recent-expenses.component.html',
  styleUrls: ['./recent-expenses.component.scss'],
})
export class RecentExpensesComponent implements OnInit {
  expenseList!: Observable<List<Expense>>;
  totalPrice$!: Observable<number>;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseList = this.expenseService.onExpenseListChange;
    this.totalPrice$ = this.expenseService.totalExpense;
  }
}
