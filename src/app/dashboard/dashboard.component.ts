import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser?:User

  constructor(
    private title: Title, 
    private auth: AuthService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.title.setTitle("Dashboard")

    this.getCurrentUser()
  }

  logout() {
    this.auth.logOut();
  }

  getCurrentUser() {
    this.http.get<User>(environment.backendRoot + '/dashboard/current-user/', {
      headers: {
        "Authorization": "Bearer " + this.auth.getCurrentUser()
      }
    }).subscribe(
      data => {
        console.log(typeof data)
        this.currentUser = data
      },
      error => {
        if (error.status == 500) this.logout()
      }
    )
  }

}

export interface User {
  _id: string,
  name: {
    firstName: string,
    lastName: string
  },
  username: string,
  email: string,
  phoneNumber: string,
  password: string
}