import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Datlich1080RoutingModule } from './datlich1080-routing.module';
import { AddDatLichComponent } from './add-dat-lich/add-dat-lich.component';
import { EditDatLichComponent } from './edit-dat-lich/edit-dat-lich.component';
import { OverviewDatLichComponent } from './overview-dat-lich/overview-dat-lich.component';
import { StatisticalDatLichComponent } from './statistical-dat-lich/statistical-dat-lich.component';
import { ListDatLich1080ByStatusComponent } from './list-dat-lich-1080-by-status/list-dat-lich-1080-by-status.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    Datlich1080RoutingModule,
  ],
  declarations: [
    AddDatLichComponent,
    EditDatLichComponent,
    OverviewDatLichComponent,
    ListDatLich1080ByStatusComponent,
    StatisticalDatLichComponent
  ],
  exports: [
    AddDatLichComponent,
    EditDatLichComponent,
    OverviewDatLichComponent,
    ListDatLich1080ByStatusComponent,
    StatisticalDatLichComponent
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class Datlich1080Module { }
