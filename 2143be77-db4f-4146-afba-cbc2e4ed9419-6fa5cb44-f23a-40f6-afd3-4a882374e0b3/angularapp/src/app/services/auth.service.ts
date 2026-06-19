import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public baseUrl = "https://ide-bccccbfdfbfcabebbbaadbddfacbfafafdaeb.premiumproject.examly.io/proxy/8080"
 
  constructor(private http:HttpClient) { }
 
  register(user:User):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/register`,user);
  }
 
  login(login:Login):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/api/login`,login).pipe(
      tap(result=>{
        console.log(login);
        const token=result?.token;
        if(token){
          const payload = this.decodeToken(token);
          const role =
            payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          const email =
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          const username =
            payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
          const userId =
            payload["UserId"];
 
          localStorage.setItem('Role', role);
          localStorage.setItem("token",token);
          localStorage.setItem("Email",email);
          localStorage.setItem("Username",username);
          localStorage.setItem("UserId",userId);
        }
      })
    );
  }
 
  decodeToken(token: string): any {
    const payload = token.split('.')[1];
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = atob(base64);
    return JSON.parse(json);
  }
 
  logout(){
    localStorage.clear();
  }
 
 

  isProjectManager() {
    return localStorage.getItem("Role") == "ProjectManager"
  }

  isRequirementAnalyst() {
    return localStorage.getItem("Role") == "RequirementAnalyst"
  }

 
  getUsername(){
    return localStorage.getItem("Username");
  }
 
  getEmail(){
    return localStorage.getItem("Email");
  }
 
 
  getUserId(){
    return localStorage.getItem("UserId");
  }
 
  isLoggedIn():boolean{
    const loggedIn = localStorage.getItem("Role");
    if(loggedIn){
      return true;
    }
    return false;
  }
}
