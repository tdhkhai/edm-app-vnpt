/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'data-visualization-app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  currentYear: number;
  loginForm: FormGroup;

  constructor(
    private router: Router
  ) {
    this.currentYear = new Date().getFullYear();
    // this.initForm();
    this.loginForm = new FormGroup({
      userName: new FormControl(),
      passWord: new FormControl()
    })

  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
  }


  submit() {
    console.log(this.loginForm.value);
    this.router.navigate(['welcome']);
  }

}
