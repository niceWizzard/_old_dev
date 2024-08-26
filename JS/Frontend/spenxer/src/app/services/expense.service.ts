import { Injectable } from '@angular/core';
import { List } from 'immutable';
import { BehaviorSubject, map } from 'rxjs';
import { v4 as createId } from 'uuid';
import { SaveStrategy } from '../components/utils/strategy/save/base.strategy';
import { BeforeUnloadSaveStrategy } from '../components/utils/strategy/save/before-unload.strategy';
import { OnChangeSaveStrategy } from '../components/utils/strategy/save/on-change.strategy';
import { LocalStorageService } from './local-storage.service';

export interface Expense extends ExpenseContent {
  readonly id: string;
  readonly date: Date;
  readonly lastModified?: Date;
}

export interface ExpenseContent {
  readonly totalPrice: number;
  readonly products: Product[];
  readonly tagsId: string[];
  readonly reason: string;
}

export interface Product {
  price: number;
  name: string;
}

const expenseContentKeys: (keyof ExpenseContent)[] = [
  'products',
  'reason',
  'tagsId',
  'totalPrice',
];

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  private readonly LOCAL_STORAGE_KEY = 'expenses';

  private readonly _expenseListChange = new BehaviorSubject<List<Expense>>(
    List(this.getInitialList())
    );
    
  readonly onExpenseListChange = this._expenseListChange.asObservable();
  
  readonly totalExpense = this._expenseListChange.pipe(
    map((v) =>
    v.reduce((prev: Expense | number, cur: Expense) => {
      if (typeof prev == 'number') {
        return prev + cur.totalPrice;
      }
      return prev.totalPrice + cur.totalPrice;
    }, 0)
    )
  );

  private saveStrategy?: SaveStrategy;
  
  constructor(private localStorageService: LocalStorageService) {
    // this.onExpenseListChange.subscribe(() => this.saveToLocalStorage())
    this.saveStrategy = new OnChangeSaveStrategy(this, this.saveToLocalStorage.bind(this));
  }

  

  private saveToLocalStorage() {
    const arr = this._expenseListChange.value.toArray();

    this.localStorageService.set(this.LOCAL_STORAGE_KEY, arr);
    console.log("SAVING!")
  }

  private getInitialList(): Expense[] {
    const expenses = this.localStorageService.get<Expense[]>('expenses');
    if (expenses == null && !Array.isArray(expenses)) {
      return [];
    }
    return expenses.map((v) => {
      return {
        ...v,
        date: new Date(v.date),
        lastModified: v.lastModified ? new Date(v.lastModified ) : undefined
      }
    });
  }

  add(expense: ExpenseContent) {
    // const allPropertyExists = (keyof ExpenseContent)

    const isValidExpenseContent = expenseContentKeys.some((v) => {
      if (expense[v] == undefined) {
        return false;
      }
      return true;
    });
    if (!isValidExpenseContent) {
      return;
    }
    let id = createId();
    const expenseList = this._expenseListChange.value;
    while (expenseList.find((v) => v.id == id)) {
      id = createId();
    }

    this._expenseListChange.next(
      expenseList.push({
        ...expense,
        date: new Date(),
        id,
      })
    );
  }

  remove(id: string) {
    const { value } = this._expenseListChange;
    this._expenseListChange.next(value.filter((v) => v.id != id));
    this.saveToLocalStorage();
  }

  get(id: string) {
    const { value } = this._expenseListChange;
    return value.find((v) => v.id == id);
  }

  update(id: string, updatedExpense: ExpenseContent) {
    const { value } = this._expenseListChange;
    let index = -1;
    const expense = value.find((v, i) => {
      const isSameId = v.id === id;
      if(isSameId) {index = i}
      return isSameId
    });

    if (expense == null) {
      return;
    }

    this._expenseListChange.next(
      value.update(index, 
        () => {
          return { ...updatedExpense, id, date: expense.date, lastModified: new Date() };
        }
      )
    );
  }
}
