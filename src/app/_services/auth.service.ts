import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PreLoaderService } from './pre-loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  msg?:string

  constructor(
    private http: HttpClient, 
    private router: Router,
    private preLoader: PreLoaderService) {}

  logIn(formFields: any, to?: string){
    this.preLoader.loading = true

    this.http.post<Auth>(environment.backendRoot + '/auth/log-in', formFields).subscribe(
      data => {
        if(data && data.token){
          this.setCurrentUser(data.token)
          this.router.navigateByUrl(to ? to : "/dashboard")
        }else
          this.msg = "Account details are invalid"

        this.preLoader.loading = false
      },
      error => {
        if (error.status == 0) this.msg = "Unable to connect to server"
        if (error.status == 401) this.msg = "Account not found"

        this.preLoader.loading = false
      })
  }

  logOut(){
    this.setCurrentUser();
    this.router.navigateByUrl("/log-in")
  }

  setCurrentUser(token?: string){
    if(token)
      localStorage.setItem(environment.localStorageAuthKey, token)
    else
      localStorage.removeItem(environment.localStorageAuthKey)
  }

  getCurrentUser(): any{
    return localStorage.getItem(environment.localStorageAuthKey)
  }

}

export interface Auth {
  token?: string,
  validationErrors?: object
}