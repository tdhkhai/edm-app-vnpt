import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListServicesComponent } from './list-services/list-services.component';

const routes: Routes = [
  {
    path: '', component: ListServicesComponent, data: {
      // breadcrumb: 'Phòng - Ban'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class servicesRoutingModule { }
