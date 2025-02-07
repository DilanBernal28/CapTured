import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { IApiResponse} from '../interfaces/apiResponse.interface';
import { IProduct } from '../interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url:string = 'https://7lvgszfn-8080.use2.devtunnels.ms/prd/product';

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
