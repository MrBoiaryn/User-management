import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.scss',
})
export class DialogDeleteComponent {
  firstName: string = '';
  lastName: string = '';
  index: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { firstName: string; lastName: string }
  ) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }

  Delete(): void {
    this.dialogRef.close(true);
  }
}
