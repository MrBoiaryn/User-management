import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../types/user.interface';

const url = '/assets/data/users.json';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getUsers(): Observable<UserInterface[]> {
    return this.httpClient.get<UserInterface[]>(url);
  }
}
