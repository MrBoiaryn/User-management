import { Component } from '@angular/core';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-main-layout',
  imports: [UserListComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
