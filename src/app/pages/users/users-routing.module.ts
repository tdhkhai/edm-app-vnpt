import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-users'
  },
  {
    path: 'list-users', component: ListUsersComponent,
    data: { breadcrumb: 'Danh sách người dùng' }
  },
  // {
  //   path: 'build-invoice-examples', component: BuildInvoiceExamplesComponent,
  //   data: { breadcrumb: 'Mẫu hóa đơn' }
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class UsersRoutingModule { }
