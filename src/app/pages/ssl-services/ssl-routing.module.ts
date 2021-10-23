import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewSslComponent } from './overview-ssl/overview-ssl.component';
import { StatisticalSslComponent } from './statistical-ssl/statistical-ssl.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tong-quan-ssl'
  },
  {
    path: 'so-lieu-ssl', component: StatisticalSslComponent,
    data: { breadcrumb: 'Số liệu Chứng thư số cho Website' }
  },
  {
    path: 'tong-quan-ssl', component: OverviewSslComponent,
    data: { breadcrumb: 'Tổng quan Chứng thư số cho Website' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class SSLRoutingModule { }
