import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/login',
  },
  {
    path: 'login', loadChildren: () => import('./pages/auth-form/auth.module').then(m => m.AuthModule),
    // data: { breadcrumb: 'Trang chủ' }
  },
  // {
  //   path: 'homepage', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule),
  //   data: { breadcrumb: 'Trang chủ' }
  // },
  {
    path: 'homepage', component: LayoutComponent,
    data: { breadcrumb: 'Trang chủ' },
    children: [
      {
        path: '', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
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
      {
        path: 'edu-ecosystems', loadChildren: () => import('./pages/edu-ecosystems/edu-ecosystems.module').then(m => m.EduEcosystemsModule),
        data: { breadcrumb: 'HST vnEdu' }
      },
      {
        path: 'lich-cong-tac', loadChildren: () => import('./pages/lich-cong-tac/lichcongtac.module').then(m => m.LichCongTacModule),
        data: { breadcrumb: 'Lịch công tác' }
      }, {
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
      {
        path: 'edu-ecosystems', loadChildren: () => import('./pages/edu-ecosystems/edu-ecosystems.module').then(m => m.EduEcosystemsModule),
        data: { breadcrumb: 'HST vnEdu' }
      },
      {
        path: 'lich-cong-tac', loadChildren: () => import('./pages/lich-cong-tac/lichcongtac.module').then(m => m.LichCongTacModule),
        data: { breadcrumb: 'Lịch công tác' }
      },
      {
        path: 'dat-lich-1080', loadChildren: () => import('./pages/datlich1080/datlich1080.module').then(m => m.Datlich1080Module),
        data: { breadcrumb: 'Đặt lịch qua tổng đài 1080' }
      },
      {
        path: 'ssl', loadChildren: () => import('./pages/ssl-services/ssl.module').then(m => m.SSLModule),
        data: { breadcrumb: 'Chứng thư số cho Website' }
      },


    ]
  },
  // {
  //   path:'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)
  // },
  // {
  //   path: 'units', loadChildren: () => import('./pages/units/units.module').then(m => m.UnitsModule),
  //   data: { breadcrumb: 'Phòng - Ban' }
  // },
  // {
  //   path: 'typeofservices', loadChildren: () => import('./pages/typeOfServices/typeOfServices.module').then(m => m.typeOfServicesModule),
  //   data: { breadcrumb: 'Loại hình Dịch vụ' }
  // },
  // {
  //   path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.servicesModule),
  //   data: { breadcrumb: 'Dịch vụ' }
  // },
  // {
  //   path: 'vnpt-invoice', loadChildren: () => import('./pages/vnpt-invoice/vnpt-invoice.module').then(m => m.VNPTInvoiceModule),
  //   data: { breadcrumb: 'Hóa đơn điện tử (VNPT Invoice)' }
  // },
  // {
  //   path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
  //   data: { breadcrumb: 'Người dùng' }
  // },
  // {
  //   path: 'dau-so', loadChildren: () => import('./pages/dauso-services/dauso.module').then(m => m.DauSoModule),
  //   data: { breadcrumb: 'Đầu số' }
  // },
  // {
  //   path: 'idc', loadChildren: () => import('./pages/idc-services/idc.module').then(m => m.IDCModule),
  //   data: { breadcrumb: 'Dịch vụ Hạ tầng lưu trữ' }
  // },
  // {
  //   path: 'domain', loadChildren: () => import('./pages/domain-services/domain.module').then(m => m.DomainModule),
  //   data: { breadcrumb: 'Tên miền' }
  // },
  // {
  //   path: 'webhosting', loadChildren: () => import('./pages/webhosting-services/webhosting.module').then(m => m.WebhostingModule),
  //   data: { breadcrumb: 'Webhosting' }
  // },
  // {
  //   path: 'edu-ecosystems', loadChildren: () => import('./pages/edu-ecosystems/edu-ecosystems.module').then(m => m.EduEcosystemsModule),
  //   data: { breadcrumb: 'HST vnEdu' }
  // },
  // {
  //   path: 'lich-cong-tac', loadChildren: () => import('./pages/lich-cong-tac/lichcongtac.module').then(m => m.LichCongTacModule),
  //   data: { breadcrumb: 'Lịch công tác' }
  // }, {
  //   path: 'units', loadChildren: () => import('./pages/units/units.module').then(m => m.UnitsModule),
  //   data: { breadcrumb: 'Phòng - Ban' }
  // },
  // {
  //   path: 'typeofservices', loadChildren: () => import('./pages/typeOfServices/typeOfServices.module').then(m => m.typeOfServicesModule),
  //   data: { breadcrumb: 'Loại hình Dịch vụ' }
  // },
  // {
  //   path: 'services', loadChildren: () => import('./pages/services/services.module').then(m => m.servicesModule),
  //   data: { breadcrumb: 'Dịch vụ' }
  // },
  // {
  //   path: 'vnpt-invoice', loadChildren: () => import('./pages/vnpt-invoice/vnpt-invoice.module').then(m => m.VNPTInvoiceModule),
  //   data: { breadcrumb: 'Hóa đơn điện tử (VNPT Invoice)' }
  // },
  // {
  //   path: 'users', loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule),
  //   data: { breadcrumb: 'Người dùng' }
  // },
  // {
  //   path: 'dau-so', loadChildren: () => import('./pages/dauso-services/dauso.module').then(m => m.DauSoModule),
  //   data: { breadcrumb: 'Đầu số' }
  // },
  // {
  //   path: 'idc', loadChildren: () => import('./pages/idc-services/idc.module').then(m => m.IDCModule),
  //   data: { breadcrumb: 'Dịch vụ Hạ tầng lưu trữ' }
  // },
  // {
  //   path: 'domain', loadChildren: () => import('./pages/domain-services/domain.module').then(m => m.DomainModule),
  //   data: { breadcrumb: 'Tên miền' }
  // },
  // {
  //   path: 'webhosting', loadChildren: () => import('./pages/webhosting-services/webhosting.module').then(m => m.WebhostingModule),
  //   data: { breadcrumb: 'Webhosting' }
  // },
  // {
  //   path: 'edu-ecosystems', loadChildren: () => import('./pages/edu-ecosystems/edu-ecosystems.module').then(m => m.EduEcosystemsModule),
  //   data: { breadcrumb: 'HST vnEdu' }
  // },
  // {
  //   path: 'lich-cong-tac', loadChildren: () => import('./pages/lich-cong-tac/lichcongtac.module').then(m => m.LichCongTacModule),
  //   data: { breadcrumb: 'Lịch công tác' }
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
