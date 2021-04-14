import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { UserService } from 'src/app/core/services/user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-module-edu',
  templateUrl: './add-module-edu.component.html',
  styleUrls: ['./add-module-edu.component.scss']
})
export class AddModuleEduComponent implements OnInit {
  listOfUser: any = [];
  selectedId: string;
  moduleForm: FormGroup;
  date: Date;
  moduleName: string;
  constructor(
    private eduEcosystemsServices: EduEcosystemsService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userAPI: UserService,
  ) {
    this.setForm();
  }

  ngOnInit(): void {
    this.getAllUsersActivated();
  }

  setForm() {
    this.moduleForm = new FormGroup({
      moduleName: new FormControl(''),
      fromDate_toDate: new FormControl(''),
      remark: new FormControl(''),
      income: new FormControl(''),
      am: new FormControl('')
    });
  }

  getAllUsersActivated() {
    this.userAPI.GetUsersActivated().subscribe(
      (data) => {
        this.listOfUser = data;
      }
    );
  }

  submitForm() {
    this.moduleForm.value.moduleName = this.moduleName;

    this.eduEcosystemsServices.pushModuleSLL(this.selectedId, { payload: this.moduleForm.value }).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.close('OK');
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  close() {
    this.modal.close();
  }

}
