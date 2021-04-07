import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddModuleEduComponent } from '../add-module-edu/add-module-edu.component';
import { AddVneduComponent } from '../vnedu/add-vnedu/add-vnedu.component';

@Component({
  selector: 'app-regis-edu-module',
  templateUrl: './regis-edu-module.component.html',
  styleUrls: ['./regis-edu-module.component.scss']
})
export class RegisEduModuleComponent implements OnInit {
  selecedId: string;
  constructor(
    private modalService: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
  }

  regisModule_vnEdu() {
    const modal = this.modalService.create({
      nzTitle: 'vnEDu - Sổ liên lạc điện tử',
      nzContent: AddVneduComponent,
      nzWidth: 490,
      nzBodyStyle: {
        height: '370px'
      },
    });

    if (this.selecedId !== '' || this.selecedId != null) {
      modal.componentInstance.selectedId = this.selecedId;
    } else {
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    }

  }

  regisModule(moduleName: string, subName: string) {
    const modal = this.modalService.create({
      nzTitle: moduleName + ' - ' + subName,
      nzContent: AddModuleEduComponent,
      nzWidth: 490,
      nzBodyStyle: {
        height: '310px'
      },
    });

    if (this.selecedId !== '' || this.selecedId != null) {
      modal.componentInstance.selectedId = this.selecedId;
      modal.componentInstance.moduleName = moduleName;
    } else {
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    }
  }
}
