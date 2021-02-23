import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { servicesRoutingModule } from './services-routing.module';
import { ListServicesComponent } from './list-services/list-services.component';
import { CreateServicesComponent } from './create-services/create-services.component';
import { UpdateServicesComponent } from './update-services/update-services.component';

@NgModule({
  imports: [CommonModule, servicesRoutingModule, AntDesignModule, FormsModule, ReactiveFormsModule, MatModule],
  declarations: [
    ListServicesComponent,
    CreateServicesComponent,
    UpdateServicesComponent,
  ],
  exports: [
    ListServicesComponent,
    CreateServicesComponent,
    UpdateServicesComponent,
  ]
})
// tslint:disable-next-line: class-name
export class servicesModule { }
