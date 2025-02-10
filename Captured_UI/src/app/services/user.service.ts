import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/user-login';
import { catchError, map, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response.interface';
import { Token } from '../interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient) { }

  login(user: UserLogin):Observable<IApiResponse<Token>>{
    return this.http.post(this.url, user, {observe: 'response'}).pipe(
      map((response) => {
        return {
          status: response.status, body: response.body as any[]}
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }
}
