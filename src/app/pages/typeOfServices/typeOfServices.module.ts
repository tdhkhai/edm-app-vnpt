import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { typeOfServicesRoutingModule } from './typeOfServices-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { ListTypeOfServicesComponent } from './list-type-of-services/list-type-of-services.component';
import { CreateTypeOfServicesComponent } from './create-type-of-services/create-type-of-services.component';
import { UpdateTypeOfServicesComponent } from './update-type-of-services/update-type-of-services.component';
import { UploadComponent } from '../shared/upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    typeOfServicesRoutingModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
  ],
  declarations: [
    ListTypeOfServicesComponent,
    CreateTypeOfServicesComponent,
    UpdateTypeOfServicesComponent,
    UploadComponent,
  ],
  exports: [
    ListTypeOfServicesComponent,
    CreateTypeOfServicesComponent,
    UpdateTypeOfServicesComponent,
    UploadComponent,
  ]
})
// tslint:disable-next-line: class-name
export class typeOfServicesModule { }
