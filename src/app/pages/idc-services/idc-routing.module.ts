import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewIdcComponent } from './overview-idc/overview-idc.component';
import { StatisticalIdcComponent } from './statistical-idc/statistical-idc.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bao-cao-doanh-thu-thang'
  },
  {
    path: 'so-lieu-idc', component: StatisticalIdcComponent,
    data: { breadcrumb: 'Số liệu dịch vụ Hạ tầng lưu trữ' }
  },
  {
    path: 'tong-quan-idc', component: OverviewIdcComponent,
    data: { breadcrumb: 'Tổng quan dịch vụ Hạ tầng lưu trữ' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class IDCRoutingModule { }
