import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  arg = environment.apiUrl + 'productList/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.arg);
  }

  add(data: Product) {
    return this.http.post<Product>(this.arg, data);
  }

  edit(data: any, id: number) {
    return this.http.put<Product>(this.arg + id, data);
  }

  delete(id: number) {
    return this.http.delete<Product>(this.arg + id);
  }
}
