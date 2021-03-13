import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { WebhostingRoutingModule } from './webhosting-routing.module';
import { OverviewWebhostingComponent } from './overview-webhosting/overview-webhosting.component';
import { StatisticalWebhostingComponent } from './statistical-webhosting/statistical-webhosting.component';
import { AddWebhostingComponent } from './add-webhosting/add-webhosting.component';
import { EditWebhostingComponent } from './edit-webhosting/edit-webhosting.component';
import { ExtendDetailsWebhostingComponent } from './extend-details-webhosting/extend-details-webhosting.component';
import { WebhostingListExpiredComponent } from './webhosting-list-expired/webhosting-list-expired.component';
import { ListWebhostingByStatusComponent } from './list-webhosting-by-status/list-webhosting-by-status.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
    WebhostingRoutingModule,
  ],
  declarations: [
    OverviewWebhostingComponent,
    StatisticalWebhostingComponent,
    AddWebhostingComponent,
    EditWebhostingComponent,
    ExtendDetailsWebhostingComponent,
    WebhostingListExpiredComponent,
    ListWebhostingByStatusComponent,
  ],
  exports: [
    OverviewWebhostingComponent,
    StatisticalWebhostingComponent,
    AddWebhostingComponent,
    EditWebhostingComponent,
    ExtendDetailsWebhostingComponent,
    WebhostingListExpiredComponent,
    ListWebhostingByStatusComponent,
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class WebhostingModule { }
