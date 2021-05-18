import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../modell/model';
const NAME_KEY = 'NAME';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  [x: string]: any;
 

  constructor(public http : HttpClient) { }
  removeFromCart(idCart: number, idUser: number): Observable<Cart> {
    return this.http.delete<Cart>(`http://localhost:8080/api/removeFromCart/${idCart}/${idUser}`);
  }
  findCartsForUser(idUser: number): Observable<Cart[]> {
    return this.http.get<Cart[]>(`http://localhost:8080/api/findCartsForUser/${idUser}`);
  }
  saveCartName(name: string) {
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }
  addCartToUser(cart: Cart, idUser: number): Observable<Cart> {
    return this.http.post<Cart>(`http://localhost:8080/api/addCartToUser/${idUser}`, cart);
  }

  getCartName(): any {
    return sessionStorage.getItem(NAME_KEY);
  }
 
}
