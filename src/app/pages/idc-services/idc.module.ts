import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { IDCRoutingModule } from './idc-routing.module';
import { StatisticalIdcComponent } from './statistical-idc/statistical-idc.component';
import { OverviewIdcComponent } from './overview-idc/overview-idc.component';
import { AddIdcComponent } from './add-idc/add-idc.component';
import { EditIdcComponent } from './edit-idc/edit-idc.component';
import { ExtendDetailsComponent } from './extend-details/extend-details.component';
import { PrimengModule } from 'src/app/primeng.module';
import { ListIdcByStatusComponent } from './list-idc-by-status/list-idc-by-status.component';
import { IdcListExpiredComponent } from './idc-list-expired/idc-list-expired.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    IDCRoutingModule,
    PrimengModule,
  ],
  declarations: [
    StatisticalIdcComponent,
    OverviewIdcComponent,
    AddIdcComponent,
    EditIdcComponent,
    ExtendDetailsComponent,
    ListIdcByStatusComponent,
    IdcListExpiredComponent,
  ],
  exports: [
    StatisticalIdcComponent,
    OverviewIdcComponent,
    AddIdcComponent,
    EditIdcComponent,
    ExtendDetailsComponent,
    ListIdcByStatusComponent,
    IdcListExpiredComponent,
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class IDCModule { }
