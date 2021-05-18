import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../modell/model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  findCommentsForProduct(idProduct: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`http://localhost:8080/api/findCommentsForProduct/${idProduct}`);
  }
  constructor(private http :HttpClient) { }

  addCommentToProduct(comment: Comment, idProduct: number):Observable<Comment> {
    return this.http.post<Comment>(`http://localhost:8080/api/addCommentToProduct/${idProduct}`,comment);
  }

}
