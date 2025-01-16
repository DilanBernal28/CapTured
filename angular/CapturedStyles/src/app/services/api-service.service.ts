import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  url:string = 'http://localhost:3000/prd/productos';

  constructor(private http: HttpClient) { }

  getProductos(){
    console.log(this.http.get(this.url));
    return this.http.get(this.url);
  }

}
