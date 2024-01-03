import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { Auth, AuthService } from './auth.service';
import { PreLoaderService } from './pre-loader.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  validationErrors?: object

  constructor(
    private http: HttpClient, 
    private router: Router,
    public auth: AuthService,
    private preLoader: PreLoaderService
    ) {}

  register(formFields: any) {
    this.preLoader.loading = true

    this.http.post<Auth>(environment.backendRoot + '/auth/register', formFields).subscribe(
      data => {
        if(data && data.token){
          this.auth.setCurrentUser(data.token)
          this.router.navigateByUrl("/dashboard")
        }else
          this.validationErrors = data.validationErrors

        this.preLoader.loading = false
      },
      error => { 
        this.auth.msg = "Unable to complete registration"

        this.preLoader.loading = false
      }
      )
  }
}
