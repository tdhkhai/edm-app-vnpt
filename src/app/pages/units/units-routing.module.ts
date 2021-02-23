import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUnitsComponent } from './list-units/list-units.component';


const routes: Routes = [
  {
    path: '', component: ListUnitsComponent, data: {
      // breadcrumb: 'Phòng - Ban'
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnitsRoutingModule { }
