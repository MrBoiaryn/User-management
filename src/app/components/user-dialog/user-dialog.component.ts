import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-dialog',
  imports: [],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDialogComponent { }
