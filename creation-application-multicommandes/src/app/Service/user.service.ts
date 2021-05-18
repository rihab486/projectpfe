import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../modell/model';
const USERNAME_KEY = 'USERNAME';


@Injectable({
  providedIn: 'root'
})
export class UserService {  constructor(private http: HttpClient) { }

  getUsername(): any {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  
 

  
  findByUsername(username: string) : Observable<any> {
    return  this.http.get<any>(`http://localhost:8080/api/findByUsername/${username}`);
  }


  
 
 
  
 

 
 
  
}
