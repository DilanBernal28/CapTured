import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserLogin } from '../interfaces/user-login';
import { catchError, map, Observable } from 'rxjs';
import { IApiResponse } from '../interfaces/api-response.interface';
import { Token } from '../interfaces/token';
import { UserRegister } from '../interfaces/user-register';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public isAuth: boolean = false;
  url = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) { }

  login(user: UserLogin):Observable<IApiResponse<Token>>{
    return this.http.post<HttpResponse<any>>(this.url+"/login", user, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => {
        return {
          status: response.status,
          body: response.body as Token
        } as IApiResponse<Token>;
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }

  register(user: UserRegister):Observable<IApiResponse<Token>>{
    return this.http.post<HttpResponse<any>>(this.url+"/register", user, {observe: 'response'}).pipe(
      map((response: HttpResponse<any>) => {
        return {
          status: response.status,
          body: response.body as Token
        } as IApiResponse<Token>;
      }),
      catchError((error) => {
        console.error(error);
        throw error;
      })
    )
  }
  saveUserInLocalStorage(token: Token, username: string){
    let user = {
      token: token.token,
      username: username
    }
    localStorage.setItem('user', JSON.stringify(user));
  }
  saveUserInSessionStorage(token: Token, username: string){
    let user = {
      token: token.token,
      username: username
    }
    sessionStorage.setItem('user', JSON.stringify(user));
  }
}
