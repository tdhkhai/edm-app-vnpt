import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SSLRoutingModule } from './ssl-routing.module';
import { AddSslComponent } from './add-ssl/add-ssl.component';
import { EditSslComponent } from './edit-ssl/edit-ssl.component';
import { StatisticalSslComponent } from './statistical-ssl/statistical-ssl.component';
import { OverviewSslComponent } from './overview-ssl/overview-ssl.component';
import { SslListExpiredComponent } from './ssl-list-expired/ssl-list-expired.component';
import { ExtendDetailsSslComponent } from './extend-details-ssl/extend-details-ssl.component';
import { ListSslBySslComponent } from './list-ssl-by-ssl/list-ssl-by-ssl.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    SSLRoutingModule,
  ],
  declarations: [
    AddSslComponent,
    EditSslComponent,
    StatisticalSslComponent,
    OverviewSslComponent,
    SslListExpiredComponent,
    ExtendDetailsSslComponent,
    ListSslBySslComponent
  ],
  exports: [
    AddSslComponent,
    EditSslComponent,
    StatisticalSslComponent,
    OverviewSslComponent,
    SslListExpiredComponent,
    ExtendDetailsSslComponent,
    ListSslBySslComponent
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class SSLModule { }
