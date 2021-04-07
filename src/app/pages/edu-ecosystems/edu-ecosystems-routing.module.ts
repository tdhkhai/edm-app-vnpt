import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListSchoolEduComponent } from './list-school-edu/list-school-edu.component';
import { OverviewEduEcosystemsComponent } from './overview-edu-ecosystems/overview-edu-ecosystems.component';

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
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class EduEcosystemsRoutingModule { }
