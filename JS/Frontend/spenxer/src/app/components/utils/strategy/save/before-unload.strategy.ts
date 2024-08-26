import { ExpenseService } from "src/app/services/expense.service";
import { SaveStrategy } from "./base.strategy";




export class BeforeUnloadSaveStrategy extends SaveStrategy {

    public onDestroy(): void {
        window.removeEventListener("beforeunload", this.saveCb);

    }

    constructor(private expenseServiceRef: ExpenseService, private saveCb: () => void) {
        super();
        window.addEventListener("beforeunload", this.saveCb)
    }



}