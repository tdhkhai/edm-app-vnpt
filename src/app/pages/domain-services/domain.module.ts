import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { DomainRoutingModule } from './domain-routing.module';
import { StatisticalDomainComponent } from './statistical-domain/statistical-domain.component';
import { OverviewDomainComponent } from './overview-domain/overview-domain.component';
import { AddDomainComponent } from './add-domain/add-domain.component';
import { EditDomainComponent } from './edit-domain/edit-domain.component';
import { ExtendDetailsDomainComponent } from './extend-details-domain/extend-details-domain.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    DomainRoutingModule,
  ],
  declarations: [
    StatisticalDomainComponent,
    OverviewDomainComponent,
    AddDomainComponent,
    EditDomainComponent,
    ExtendDetailsDomainComponent
  ],
  exports: [
    StatisticalDomainComponent,
    OverviewDomainComponent,
    AddDomainComponent,
    EditDomainComponent,
    ExtendDetailsDomainComponent
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class DomainModule { }
