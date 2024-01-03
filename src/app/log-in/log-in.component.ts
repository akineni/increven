import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  env = environment;

  logInForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor( 
    private formBuilder: FormBuilder, 
    private title: Title,
    public auth: AuthService ) {} 

  ngOnInit(): void {
    this.title.setTitle("Login")
    this.auth.msg = ""
  }

  logIn() {
    if(this.logInForm.valid) this.auth.logIn(this.logInForm.getRawValue());
  }

}
