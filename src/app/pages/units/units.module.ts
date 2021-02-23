import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { UnitsRoutingModule } from './units-routing.module';
import { ListUnitsComponent } from './list-units/list-units.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUnitComponent } from './create-unit/create-unit.component';
import { MatModule } from 'src/app/mat.module';
import { UpdateUnitComponent } from './update-unit/update-unit.component';


@NgModule({
  imports: [CommonModule, UnitsRoutingModule, AntDesignModule, FormsModule, ReactiveFormsModule, MatModule],
  declarations: [
    ListUnitsComponent,
    CreateUnitComponent,
    UpdateUnitComponent
  ],
  exports: [
    ListUnitsComponent,
    CreateUnitComponent,
    UpdateUnitComponent,
  ]
})
export class UnitsModule { }
