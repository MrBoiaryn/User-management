import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserInterface } from '../../shared/types/user.interface';
import { HttpClientService } from '../../shared/services/httpClient.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
  constructor(private httpClientService: HttpClientService) {}

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'createdAt',
    'email',
    'tags',
    'description',
    'action',
  ];

  dataSource!: MatTableDataSource<UserInterface>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<UserInterface>([]);
    this.getData();
  }

  getData() {
    this.httpClientService.getUsers().subscribe((res: UserInterface[]) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      console.log(res);
    });
  }
}
