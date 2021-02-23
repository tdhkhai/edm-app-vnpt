import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/welcome',
    data: {},
  },
  {
    path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule),
    data: { breadcrumb: 'Trang chủ' }
  },
  {
    path: 'units', loadChildren: () => import('./pages/units/units.module').then(m => m.UnitsModule),
    data: { breadcrumb: 'Phòng - Ban' }
  },
  {
    path: 'typeofservices', loadChildren: () => import('./pages/typeOfServices/typeOfServices.module').then(m => m.typeOfServicesModule),
    data: { breadcrumb: 'Loại hình Dịch vụ' }
  },
  {
    path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.servicesModule),
    data: { breadcrumb: 'Dịch vụ' }
  },
  {
    path: 'vnpt-invoice', loadChildren: () => import('./pages/vnpt-invoice/vnpt-invoice.module').then(m => m.VNPTInvoiceModule),
    data: { breadcrumb: 'Hóa đơn điện tử (VNPT Invoice)' }
  },
  {
    path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
    data: { breadcrumb: 'Người dùng' }
  },
  {
    path: 'dau-so', loadChildren: () => import('./pages/dauso-services/dauso.module').then(m => m.DauSoModule),
    data: { breadcrumb: 'Đầu số' }
  },
  {
    path: 'idc', loadChildren: () => import('./pages/idc-services/idc.module').then(m => m.IDCModule),
    data: { breadcrumb: 'Dịch vụ Hạ tầng lưu trữ' }
  },
  {
    path: 'domain', loadChildren: () => import('./pages/domain-services/domain.module').then(m => m.DomainModule),
    data: { breadcrumb: 'Tên miền' }
  },
  {
    path: 'webhosting', loadChildren: () => import('./pages/webhosting-services/webhosting.module').then(m => m.WebhostingModule),
    data: { breadcrumb: 'Webhosting' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
