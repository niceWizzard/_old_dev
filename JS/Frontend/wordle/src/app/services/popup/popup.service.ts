import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { timer } from 'rxjs';
import { ConfirmationPopupComponent, ConfirmationPopupConfig } from './confirmation-popup/confirmation-popup.component';
import { TimedPopupComponent, TimedPopupData } from './timed-popup/timed-popup.component';


@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private dialog: MatDialog) { }

  private activeDialog: MatDialogRef<any> | null = null;

  openDialog<T = unknown>(component: ComponentType<T>, config?: MatDialogConfig): MatDialogRef<T> | null {
    if(this.activeDialog != null) {
      return null;
    }
    const c = this.dialog.open(component, {
      width: "250px",
      restoreFocus: true,
      ...config
    });
    this.activeDialog = c;
    
    c.afterClosed().subscribe(() => {
      this.activeDialog = null;
    });
    return c
  }

  timedPopup(seconds: number, info: TimedPopupData & {
    config?: MatDialogConfig<any>
  }) {
    const ref = this.openDialog(TimedPopupComponent, {
      data: info, ...info.config}
      );
    timer(seconds * 1000).subscribe(() => {
      ref?.close();
    });
    return ref;
  }

  confirmationPopup(config: ConfirmationPopupConfig & {config?: MatDialogConfig}) {
    const ref = this.openDialog(ConfirmationPopupComponent, {
      data: config, ...config.config}
      );
    return ref;
  }

}
