import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../modell/model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  editCategory(category: Category, id: number): Observable<Category> {
    return this.http.put<Category>(`http://localhost:8080/api/editCategory/${id}`, category);
  }
  addCategoryToUser(category: Category, idUser: number): Observable<Category> {
    return this.http.post<Category>(`http://localhost:8080/api/addCategoryToUser/${idUser}`, category);
  }
   findCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:8080/api/findCategoryById/${id}`);
  }
  findAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`http://localhost:8080/api/findAllCategories`);
  }
}
