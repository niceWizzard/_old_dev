import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, merge, Observable, takeWhile } from 'rxjs';
import {
  Expense,
  ExpenseContent,
  ExpenseService,
  Product,
} from '../services/expense.service';
import { QuickCreateTagComponent } from './quick-create-tag/quick-create-tag.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Tag, TagsService } from '../services/tags.service';
import { ActivatedRoute, Router } from '@angular/router';
import Big from 'big.js';
import { cloneDeep } from 'lodash';
import {
  trigger,
  transition,
  query,
  style,
  stagger,
  animate,
} from '@angular/animations';
import { Location } from '@angular/common';

@Component({
  selector: 'app-expense-editor',
  templateUrl: './expense-editor.component.html',
  styleUrls: ['./expense-editor.component.scss'],
  animations: [
    trigger('productListAnimation', [
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, height: 0 }),
            stagger(
              '60ms',
              animate('300ms ease-in-out', style({ opacity: 1, height: '*' }))
            ),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        query(
          ':leave',
          [
            style({ opacity: 1, height: '*' }),
            stagger(
              '60ms',
              animate('300ms ease-out', style({ height: 0, opacity: 0 }))
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('tagListAnimation', [
      transition(':increment', [
        query(
          ':enter',
          [
            style({ opacity: 0, width: 0 }),
            stagger(
              '60ms',
              animate('300ms ease-in-out', style({ opacity: 1, width: '*' }))
            ),
          ],
          { optional: true }
        ),
      ]),
      transition(':decrement', [
        query(
          ':leave',
          [
            style({ opacity: 1, width: '*' }),
            stagger(
              '60ms',
              animate('300ms ease-out', style({ width: 0, opacity: 0 }))
            ),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class ExpenseEditorComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private dialog: MatDialog,
    private tagService: TagsService,
    private router: Router,
    private locationService: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  isAlive = true;

  form!: FormGroup;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  get productsArray() {
    return this.form.get('products') as FormArray;
  }

  totalPrice = 0;
  tagInputControl = new FormControl('');

  filteredTags!: Observable<string[]>;

  existingTags: Tag[] = [];

  tags: Tag[] = [];

  expenseRef?: Expense;

  quickCreateDialogRef?: MatDialogRef<QuickCreateTagComponent>

  @ViewChild('tagInputRef') tagInputRef!: ElementRef<HTMLInputElement>;

  //#region Life Cycle CB

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((v) => {
        const id = v['id'] as string;
        if (id.toLowerCase() != 'new') {
          this.expenseRef = this.expenseService.get(id);
          this.totalPrice = this.expenseRef?.totalPrice || 0;
        }
        this.form = this.fb.group({
          products: this.initializeProductsArray(),
          reason: this.expenseRef?.reason || '',
        });
        this.tags = this.tags.concat(this.tagService.getTagsById(this.expenseRef?.tagsId || []))
        this.checkToggleTagInputControl();
      });

    this.productsArray.valueChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((v: Product[]) => {
        let total = new Big(0);
        v.forEach((value) => {
          total = total.plus(new Big(value.price || 0));
        });
        this.totalPrice = total.toNumber();
      });

    this.tagService.tagChanges
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((v) => {
        this.existingTags = v.toArray().sort((a, b) => {
          const bName = b.name.toLowerCase();
          const aName = a.name.toLowerCase();
          if (aName < bName) {
            return -1;
          } else if (aName > bName) {
            return 1;
          }
          return 0;
        });
      });

    this.filteredTags = merge(
      this.tagInputControl.valueChanges
    ).pipe(
      takeWhile(() => this.isAlive),
      map((inputValue: string | null) =>
        inputValue ? this._filterTags(inputValue) : this.existingTags.slice()
      ),
      map((v) =>
        v
          .filter((tag) => {
            const isAlreadyInTags =
              this.tags.find((existingTag) => {
                const isSame =
                  existingTag.name.toLowerCase() == tag.name.toLowerCase();
                return isSame;
              }) != undefined;
            return !isAlreadyInTags;
          })
          .map((a) => a.name)
      )
    );

  }

  ngOnDestroy(): void {
    this.isAlive = false;
    this.quickCreateDialogRef?.close();
  }

  //#endregion

  private createProducts(v?: Product) {
    return this.fb.group({
      name: v?.name || '',
      price: [v?.price || null, [customValidator()]],
    });
  }

  private initializeProductsArray(): any {
    const arr = this.expenseRef?.products.map((v) =>
      this.createProducts(v)
    ) || [this.createProducts()];
    return this.fb.array(arr);
  }

  
  private _filterTags(value: string): Tag[] {
    const filterValue = value.toLowerCase();
    const filtered = this.existingTags.filter((tag) =>
      tag.name.toLowerCase().includes(filterValue)
    );
    return filtered;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const dupedFormValue = cloneDeep(this.form.value);
    const copy = {
      ...dupedFormValue,
      tagsId: this.tags.map(v => v.id),

      totalPrice: dupedFormValue.products
        .reduce((prev: Big, cur: Product) => {
          return prev.add(Big(cur.price));
        }, new Big(0))
        .toNumber(),
    } as ExpenseContent;

    this.expenseRef
      ? this.expenseService.update(this.expenseRef?.id, copy)
      : this.expenseService.add(copy);
    this.router.navigate(['']);
  }

  addProduct() {
    const product = this.createProducts();
    this.productsArray.push(product);
  }
  removeProduct(i: number) {
    this.productsArray.removeAt(i);
  }

  removeTag(index: number) {
    this.tags.splice(index, 1);
    this.checkToggleTagInputControl();
  }

  addTag(e: MatChipInputEvent | MatAutocompleteSelectedEvent) {
    let value = '';
    if (e instanceof MatAutocompleteSelectedEvent) {
      value = e.option.value;
    } else {
      value = e.value;
    }
    const foundTag = this.existingTags.find(
      (v) => v.name.toLowerCase() == value.toLowerCase()
    );

    if (
      value == '' ||
      foundTag == null ||
      this.tags.length > 2 ||
      this.tags.find((v) => v.name.toLowerCase() == value.toLowerCase())
    ) {
      return;
    }
    if (!(e instanceof MatAutocompleteSelectedEvent)) {
      e.chipInput?.clear();
    } else {
      this.tagInputControl.setValue('');
      this.tagInputRef.nativeElement.value = '';
    }
    this.tags.push(foundTag);
    this.checkToggleTagInputControl();
  }

  private checkToggleTagInputControl() {
    this.tags.length >= 3
      ? this.tagInputControl.disable()
      : this.tagInputControl.enable();
    

  }

  openQuickCreateTag() {
    this.quickCreateDialogRef = this.dialog.open(QuickCreateTagComponent, {
      width: '70vw',
      autoFocus: true,
      restoreFocus: true,
    });
  }

  goBackToPrevPage() {
    this.locationService.back();
  }
}

function customValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const controlValue = ((control.value as number) || 0).toString();
    if (controlValue.includes('e')) {
      return {
        invalidLengthAfterDecimal: true,
      };
    }
    const dotIndex = controlValue.indexOf('.');
    if (dotIndex < 0 || dotIndex >= controlValue.length - 1) {
      return null;
    }
    const numberAfterDot = controlValue.slice(dotIndex + 1);
    if (numberAfterDot.length > 2) {
      return {
        invalidLengthAfterDecimal: true,
      };
    }
    return null;
  };
}
