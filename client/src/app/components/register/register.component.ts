import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;


  constructor(
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }
  createForm() {
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(35),
        this.validatePassword
      ])],
      confirmPassword: ['', Validators.required]
    }, { validator: this.matchingPasswords('password', 'confirmPassword')});
  };


  matchingPasswords(password, confirmPassword) {
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirmPassword].value) {
        return null;
      } else {
        return {'matchingPasswords' : true};
      }
    }
  }

  validateEmail(controls) {
    const regExp = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateEmail': true}
    }
  }

  validateUsername(controls) {
    const regExp = new RegExp(
      /^[a-zA-Z0-9]+$/
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateEmail': true}
    }
  }

  validatePassword(controls) {
    const regExp = new RegExp(
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/
    );
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateEmail': true}
    }
  }
  onRegisterSubmit() {
    console.log(this.form)
  }
  ngOnInit() {
  }

}
