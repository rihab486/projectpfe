import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Product } from '../modell/model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private http: HttpClient) { }

  addProductToCategory(product: Product, idCategory: number): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8080/api/addProductToCategory/${idCategory}`, product);
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8080/api/editProduct/${id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8080/api/deleteProduct/${id}`);
  }

  findProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/api/findProductById/${id}`);
  }

  findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/api/findAllProducts`);
  }

  findProductsForCategory(idCategory: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/api/findProductsForCategory/${idCategory}`);
  }
  deleteProductFromTag(idProduct: number, idTag: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8080/api/deleteProductFromTag/${idProduct}/${idTag}`);
  }
  findByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/api/findByName/${name}`);
  }


}
