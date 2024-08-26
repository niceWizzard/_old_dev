import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Expense, ExpenseService } from 'src/app/services/expense.service';
import { Tag, TagsService } from 'src/app/services/tags.service';
import { ExpandedExpenseComponent } from './expanded-expense/expanded-expense.component';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit, OnDestroy {
  constructor(
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private tagsService: TagsService,
  ) {}
  ngOnDestroy(): void {
    this.dialogRef?.close();
  }

  dialogRef?: MatDialogRef<ExpandedExpenseComponent>;

  @Input() expense!: Expense;
  tags: Tag[] = [];

  ngOnInit(): void {
    if (!this.expense) {
      throw new Error('Expense is not provided in the component!');
    }
    this.tags = this.tagsService.getTagsById(this.expense.tagsId);
    
  }

  showPreview() {
    this.dialogRef = this.dialog.open(ExpandedExpenseComponent, {
      data: {
        expense: this.expense,
      },
      width: "70vw",
    });
  }

  delete() {
    this.expenseService.remove(this.expense.id);
  }
}
