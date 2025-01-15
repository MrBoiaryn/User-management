import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UserInterface } from '../types/user.interface';

const url = '/assets/data/users.json';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: Map<string, UserInterface> = new Map();

  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(url).pipe(
      map((res) => {
        res.forEach((user) => {
          this.users.set(user.email, user);
        });
        return Array.from(this.users.values());
      })
    );
  }

  updateUser(user: UserInterface): Observable<UserInterface[]> {
    user.createdAt = new Date();
    this.users.set(user.email, user);
    return of(Array.from(this.users.values()));
  }

  deleteUser(user: UserInterface): Observable<UserInterface[]> {
    this.users.delete(user.email);
    return of(Array.from(this.users.values()));
  }
}
