import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserInterface } from '../../shared/types/user.interface';
import { UserService } from '../../shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogModule } from '@angular/cdk/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    MatDialogModule,
    DialogModule,
    MatChipsModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'createdAt',
    'email',
    'tags',
    'description',
    'action',
  ];

  dataSource: MatTableDataSource<UserInterface> =
    new MatTableDataSource<UserInterface>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = this.sortUsers(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  openDialog(
    user: UserInterface | null = null,
    index: number | null = null
  ): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: {
        user: user ?? {},
        index: index,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateUser(result);
      }
    });
  }

  updateUser(updatedUser: UserInterface): void {
    this.userService.updateUser(updatedUser).subscribe((users) => {
      this.dataSource.data = this.sortUsers(users);
    });
  }

  editUser(index: number): void {
    const user = this.dataSource.data[index];
    this.openDialog(user, index);
  }

  deleteUser(user: UserInterface): void {
    this.userService.deleteUser(user).subscribe((users) => {
      this.dataSource.data = this.sortUsers(users);
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  deleteUserOpenDialog(user: UserInterface): void {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  sortUsers(users: UserInterface[]): UserInterface[] {
    return users.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  }
}
