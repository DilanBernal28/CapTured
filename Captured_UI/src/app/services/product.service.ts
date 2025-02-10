import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { IApiResponse} from '../interfaces/api-response.interface';
import { IProduct } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = 'http://localhost:8080/prd/product';

  constructor(private http: HttpClient) { }

  getProductos(): Observable<IApiResponse<IProduct>> {
    return this.http.get(this.url, { observe: 'response' }).pipe(
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
