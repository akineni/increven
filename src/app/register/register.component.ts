import { Component, OnInit } from '@angular/core';
import {FormBuilder, AbstractControl, Validators, FormControl, ValidationErrors} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { RegistrationService } from '../_services/registration.service';
import { UtilitiesService } from '../_services/utilities.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  env = environment;

  registrationForm = this.formBuilder.group({
    name: this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(environment.patterns.name)]],
      lastName: ['', [Validators.required, Validators.pattern(environment.patterns.name)]]
    }),
    username: ['', Validators.required, this.utilities.uniqueValidatorFn('username')],
    email: ['', [Validators.required, Validators.email], this.utilities.uniqueValidatorFn('email')],
    phoneNumber: ['', [Validators.required, Validators.pattern(environment.patterns.phoneNumber)],
      this.utilities.uniqueValidatorFn('phoneNumber')],
    password: ['', [Validators.required, Validators.minLength(environment.minLengths.password)]],
    password2: ['', Validators.required],
    acceptance: ['', Validators.requiredTrue]
  });

  constructor( 
    private formBuilder: FormBuilder, 
    private title: Title,
    public registration: RegistrationService,
    private utilities: UtilitiesService) { }

  ngOnInit(): void {
      this.title.setTitle("Register");
      this.registration.auth.msg = ""

      this.registrationForm.controls.password2.setValidators(
        [Validators.required, (control: AbstractControl):{
          [key: string]: any;
      } | null => {
        return (this.registrationForm.controls["password"].value === control.value) ?
        null : {"confirmPassword" : true};
        }]
      )
  }

  checkPasswordsSync() {
    let password2Control:FormControl = <FormControl>this.registrationForm.controls.password2;
    if(password2Control.dirty && this.registrationForm.controls.password.value != password2Control.value)
      password2Control.setErrors({"confirmPassword" : true});
  }

  register() {
    if(this.registrationForm.valid) this.registration.register(this.registrationForm.getRawValue())
  }
}