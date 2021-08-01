import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportModuleComponent } from './import-module/import-module.component';
import { ListSchoolEduComponent } from './list-school-edu/list-school-edu.component';
import { OverviewEduEcosystemsComponent } from './overview-edu-ecosystems/overview-edu-ecosystems.component';
import { ThongKeSlTruongThucTeComponent } from './thong-ke-sl-truong-thuc-te/thong-ke-sl-truong-thuc-te.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'chi-tiet'
  },
  {
    path: 'chi-tiet', component: ListSchoolEduComponent,
    data: { breadcrumb: 'Danh sách trường sử dụng HST vnEdu' }
  },
  {
    path: 'tong-quan-edu-ecosystems', component: OverviewEduEcosystemsComponent,
    data: { breadcrumb: 'Danh sách trường sử dụng HST vnEdu' }
  },
  {
    path: 'thong-ke-sl-truong-thuc-te', component: ThongKeSlTruongThucTeComponent,
    data: { breadcrumb: 'Thống kê số lượng trường thực tế' }
  },
  {
    path: 'import-module', component: ImportModuleComponent,
    data: { breadcrumb: 'Import module Edu Ecosystems' }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class EduEcosystemsRoutingModule { }
