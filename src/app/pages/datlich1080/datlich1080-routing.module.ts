import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewDatLichComponent } from './overview-dat-lich/overview-dat-lich.component';
import { StatisticalDatLichComponent } from './statistical-dat-lich/statistical-dat-lich.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tong-quan-1080'
  },
  {
    path: 'so-lieu-1080', component: StatisticalDatLichComponent,
    data: { breadcrumb: 'Số liệu Đặt lịch qua Tổng đài 1080' }
  },
  {
    path: 'tong-quan-1080', component: OverviewDatLichComponent,
    data: { breadcrumb: 'Tổng quan Đặt lịch qua Tổng đài 1080' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class Datlich1080RoutingModule { }
