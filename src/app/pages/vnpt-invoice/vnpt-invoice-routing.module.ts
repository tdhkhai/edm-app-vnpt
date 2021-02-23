import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildInvoiceExamplesComponent } from './build-invoice-examples/build-invoice-examples.component';
import { DataOfSitesComponent } from './data-of-sites/data-of-sites.component';
import { IncomeMonthInvoiceComponent } from './income-month-invoice/income-month-invoice.component';
import { IncomeYearInvoiceComponent } from './income-year-invoice/income-year-invoice.component';
import { OverviewInvoiceComponent } from './overview-invoice/overview-invoice.component';
import { StatisticalInvoiceComponent } from './statistical-invoice/statistical-invoice.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bao-cao-doanh-thu-thang'
  },
  {
    path: 'bao-cao-doanh-thu-thang', component: IncomeMonthInvoiceComponent,
    data: { breadcrumb: 'Doanh thu HDDT theo tháng' }
  },
  {
    path: 'bao-cao-doanh-thu-nam', component: IncomeYearInvoiceComponent,
    data: { breadcrumb: 'Doanh thu HDDT theo năm' }
  },
  {
    path: 'chi-tiet-hddt', component: StatisticalInvoiceComponent,
    data: { breadcrumb: 'Số liệu HDDT' }
  },
  {
    path: 'build-invoice-examples', component: BuildInvoiceExamplesComponent,
    data: { breadcrumb: 'Mẫu hóa đơn' }
  },
  {
    path: 'so-lieu-site', component: DataOfSitesComponent,
    data: { breadcrumb: 'Số liệu Site' }
  },
  {
    path: 'tong-quan-hddt', component: OverviewInvoiceComponent,
    data: { breadcrumb: 'Tổng quan Hóa đơn điện tử' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class VNPTInvoiceRoutingModule { }
