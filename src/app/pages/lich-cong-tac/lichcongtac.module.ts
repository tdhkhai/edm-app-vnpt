import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XinXeComponent } from './xin-xe/xin-xe.component';
import { AntDesignModule } from 'src/app/antDesign.module';
import { LichCongTacRoutingModule } from './lichcongtac-routing.module';
import { AddXinXeComponent } from './add-xin-xe/add-xin-xe.component';
import { EditXinXeComponent } from './edit-xin-xe/edit-xin-xe.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    LichCongTacRoutingModule
  ],
  declarations: [
    XinXeComponent,
    AddXinXeComponent,
    EditXinXeComponent,
  ],
  exports: [
    XinXeComponent,
    AddXinXeComponent,
    EditXinXeComponent,
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class LichCongTacModule { }
