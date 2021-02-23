import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { DauSoRoutingModule } from './dauso-routing.module';
import { OverviewDausoComponent } from './overview-dauso/overview-dauso.component';
import { StatisticalDausoComponent } from './statistical-dauso/statistical-dauso.component';
import { AddDausoComponent } from './add-dauso/add-dauso.component';
import { EditDausoComponent } from './edit-dauso/edit-dauso.component';
import { ListDauSoByStatusComponent } from './list-dau-so-by-status/list-dau-so-by-status.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    DauSoRoutingModule,
  ],
  declarations: [
    OverviewDausoComponent,
    StatisticalDausoComponent,
    AddDausoComponent,
    EditDausoComponent,
    ListDauSoByStatusComponent
  ],
  exports: [
    OverviewDausoComponent,
    StatisticalDausoComponent,
    AddDausoComponent,
    EditDausoComponent,
    ListDauSoByStatusComponent
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class DauSoModule { }
