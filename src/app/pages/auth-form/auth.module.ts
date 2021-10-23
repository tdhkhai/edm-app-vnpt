import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignModule } from '../../antDesign.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LoginFormComponent,
  ],
  exports: [
    LoginFormComponent
  ]
})
export class AuthModule { }
