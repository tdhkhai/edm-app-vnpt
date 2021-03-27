import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { XinXeComponent } from './xin-xe/xin-xe.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'xin-xe'
  },
  {
    path: 'xin-xe', component: XinXeComponent,
    data: { breadcrumb: 'Xin xe' }
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class LichCongTacRoutingModule { }
