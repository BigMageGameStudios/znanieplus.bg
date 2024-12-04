import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'cancel-subscription-dialog',
  templateUrl: 'cancel-subscription-dialog.html',
  styleUrls: ['style.scss'],
})
export class CancelSubscriptionDialog {

  constructor(
    public dialogRef: MatDialogRef<CancelSubscriptionDialog>,
  ) {}

  cancel(): void {
    this.dialogRef.close({confirm: false});
  }

  confirm (): void {
    this.dialogRef.close({confirm: true});
  }

}
