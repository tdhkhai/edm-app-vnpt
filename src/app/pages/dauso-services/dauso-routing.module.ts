import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OverviewDausoComponent } from './overview-dauso/overview-dauso.component';
import { StatisticalDausoComponent } from './statistical-dauso/statistical-dauso.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tong-quan-dau-so'
  },
  {
    path: 'so-lieu-dau-so', component: StatisticalDausoComponent,
    data: { breadcrumb: 'Số liệu Đầu số 1800 - 1900' }
  },
  {
    path: 'tong-quan-dau-so', component: OverviewDausoComponent,
    data: { breadcrumb: 'Tổng quan Đầu số 1800 - 1900' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class DauSoRoutingModule { }
