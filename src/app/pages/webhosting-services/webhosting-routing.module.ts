import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewWebhostingComponent } from './overview-webhosting/overview-webhosting.component';
import { StatisticalWebhostingComponent } from './statistical-webhosting/statistical-webhosting.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tong-quan-webhosting'
  },
  {
    path: 'so-lieu-webhosting', component: StatisticalWebhostingComponent,
    data: { breadcrumb: 'Số liệu Webhosting' }
  },
  {
    path: 'tong-quan-webhosting', component: OverviewWebhostingComponent,
    data: { breadcrumb: 'Tổng quan Webhosting' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class WebhostingRoutingModule { }
