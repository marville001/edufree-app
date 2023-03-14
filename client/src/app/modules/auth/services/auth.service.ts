import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  onLogin(userEmail : string, password : string){
    const loginUrl = ''
    const data = {
      userEmail : userEmail,
      userPass : password
    }
    this.http.post(loginUrl, data)
  }

  onRegister(userEmail : string, password : string){
    const registerUrl = ''
    const data = {
      userEmail : userEmail,
      userPass : password
    }
    this.http.post(registerUrl, data)
  }
}
