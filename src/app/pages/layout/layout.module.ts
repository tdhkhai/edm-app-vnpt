import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AntDesignModule } from '../../antDesign.module';
import { WelcomeComponent } from '../welcome/welcome.component';
import { WelcomeModule } from '../welcome/welcome.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';


@NgModule({
  imports:
  [
    NzLayoutModule,
    NzMenuModule,
    LayoutRoutingModule,
    AntDesignModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LayoutComponent,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
