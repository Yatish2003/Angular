import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 

interface User {
  userName: string;
  lastName: string;
  email: string;
  pass: string;
  Cpass: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'http://localhost:5000/api/users';  

  constructor(private http: HttpClient) { }
  
  getUser(): Observable<any> {
    return this.http.get(this.url);
  }
  getUserById(id:any){

    return this.http.get(`http://localhost:5000/api/users/${id}`)

  }

  deleteUser(id: any): Observable<void> {
    const saveUrl = 'http://localhost:5000/api/users';
    return this.http.delete<void>(`${saveUrl}/${id}`);
  }
//@ts-ignore
  saveUser(user: User): Observable<any>{
    try{
    const saveUrl = 'http://localhost:5000/api/users';  
   
    return this.http.post(saveUrl, user);
    }catch(error){
      //@ts-ignore
      console.error(error.message);
    }
  }
  updateUser(id:string,body:any){

      
   return this.http.put(`http://localhost:5000/api/users/${id}`, body);
  }

}
