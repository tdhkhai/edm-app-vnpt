import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTypeOfServicesComponent } from './list-type-of-services/list-type-of-services.component';

const routes: Routes = [
  {
    path: '', component: ListTypeOfServicesComponent, data: {
      // breadcrumb: 'Phòng - Ban'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line: class-name
export class typeOfServicesRoutingModule { }
