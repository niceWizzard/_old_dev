import { ComponentFixture, TestBed } from '@angular/core/testing';
import * as Color from 'color';
import { Expense } from 'src/app/services/expense.service';

import { ExpenseComponent } from './expense.component';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    const expense: Expense = {
      date: new Date(),
      id: '1',
      products: [],
      reason: "",
      tags: [{
        name: "",
        color: Color('')
      }],
      totalPrice: 0
    }
    component.expense = expense;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an expense', () => {
    expect(component.expense).toBeTruthy();
  })

  describe('Toggling of Expense', () => {
    it('should open', () => {
      component.onExpenseClick(null as any)
      fixture.detectChanges();
      expect(component.showDetails).toBeTrue();
    });
    it('should close', () => {
      component.showDetails = true;

      component.onExpenseClick(null as any)
      expect(component.showDetails).toBeFalse();
      // 
      component.onExpenseClick(null as any)
      expect(component.showDetails).toBeTrue();

      component.unExpandDetails(new MouseEvent('click'))
      expect(component.showDetails).toBeFalse();
    });

    it('should open when clicked', () => {
      const compiled = fixture.nativeElement as HTMLDivElement;
      const container = compiled.querySelector('.container') as HTMLElement;
      container.click();
      expect(component.showDetails).toBeTrue();
    })
    it('should do nothing when inside details is clicked', () => {
      component.showDetails = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLDivElement;
      const container = compiled.querySelector('.details') as HTMLElement;
      container.click();
      expect(component.showDetails).toBeTrue();
    })

    it('should close when unexpand button is clicked', () => {
      component.showDetails = true;
      fixture.detectChanges();
      const compiled = fixture.nativeElement as HTMLDivElement;
      const container = compiled.querySelector('#unexpand-details') as HTMLElement;
      container.click();
      expect(component.showDetails).toBeFalse();
    });

  });

});
