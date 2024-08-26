import { takeWhile } from "lodash";
import { filter, Observable, skip, Subscription } from "rxjs";
import { ExpenseService } from "src/app/services/expense.service";
import { SaveStrategy } from "./base.strategy";

export class OnChangeSaveStrategy extends SaveStrategy {

    private readonly onChangeEventSubscription : Subscription;

    constructor(expenseServiceRef: ExpenseService, saveCb: () => void) {
        super();
        this.onChangeEventSubscription = 
            expenseServiceRef
            .onExpenseListChange
            .pipe(
                skip(1)
            ).subscribe(() => {
                saveCb();
            })
    }

    public onDestroy(): void {
        this.onChangeEventSubscription.unsubscribe();
    }

}