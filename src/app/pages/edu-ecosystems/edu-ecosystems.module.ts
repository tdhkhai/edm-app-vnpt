import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AntDesignModule } from 'src/app/antDesign.module';
import { EduEcosystemsRoutingModule } from './edu-ecosystems-routing.module';
import { AddVneduComponent } from './vnedu/add-vnedu/add-vnedu.component';
import { EditVneduComponent } from './vnedu/edit-vnedu/edit-vnedu.component';
import { ListSchoolEduComponent } from './list-school-edu/list-school-edu.component';
import { OverviewEduEcosystemsComponent } from './overview-edu-ecosystems/overview-edu-ecosystems.component';
import { RegisEduModuleComponent } from './regis-edu-module/regis-edu-module.component';
import { AddSchoolComponent } from './add-school/add-school.component';
import { EditSchoolComponent } from './edit-school/edit-school.component';
import { AddModuleEduComponent } from './add-module-edu/add-module-edu.component';
import { ListModulesComponent } from './module-by-school/list-modules/list-modules.component';
import { ImportModuleComponent } from './import-module/import-module.component';
import { FilterPipe } from '../../../app/core/pipe/filter.pipe';
import { ThongKeSlTruongThucTeComponent } from './thong-ke-sl-truong-thuc-te/thong-ke-sl-truong-thuc-te.component';

@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    FormsModule,
    ReactiveFormsModule,
    EduEcosystemsRoutingModule,

  ],
  declarations: [
    FilterPipe,
    OverviewEduEcosystemsComponent,
    ListSchoolEduComponent,
    RegisEduModuleComponent,
    AddSchoolComponent,
    EditSchoolComponent,
    AddVneduComponent,
    EditVneduComponent,
    AddModuleEduComponent,
    ListModulesComponent,
    ImportModuleComponent,
    ThongKeSlTruongThucTeComponent,
  ],
  exports: [
    OverviewEduEcosystemsComponent,
    ListSchoolEduComponent,
    RegisEduModuleComponent,
    AddSchoolComponent,
    EditSchoolComponent,
    AddVneduComponent,
    EditVneduComponent,
    AddModuleEduComponent,
    ListModulesComponent,
    ImportModuleComponent,
    ThongKeSlTruongThucTeComponent,
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class EduEcosystemsModule { }
