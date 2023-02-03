import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  APILINK = 'https://fakestoreapi.com/products';
  
  constructor(private http: HttpClient) { }

  getAllProducts() {
    return this.http.get<Product[]>(this.APILINK);
  }

  addProduct(product: Product) {
    return this.http.post(this.APILINK, product);
  }

  updateProduct(id:String, product: Product) {
    return this.http.patch(this.APILINK + '/' + id, product);
  }

  deleteProduct(id:String) {
    return this.http.delete(this.APILINK + '/' + id);
  }
}
