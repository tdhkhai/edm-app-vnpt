import { NgModule } from '@angular/core';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    AntDesignModule,
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
