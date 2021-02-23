import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewDomainComponent } from './overview-domain/overview-domain.component';
import { StatisticalDomainComponent } from './statistical-domain/statistical-domain.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tong-quan-domain'
  },
  {
    path: 'so-lieu-domain', component: StatisticalDomainComponent,
    data: { breadcrumb: 'Số liệu Tên miền Việt Nam - Tên miền Quốc tế' }
  },
  {
    path: 'tong-quan-domain', component: OverviewDomainComponent,
    data: { breadcrumb: 'Tổng quan Tên miền Việt Nam - Tên miền Quốc tế' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class DomainRoutingModule { }
