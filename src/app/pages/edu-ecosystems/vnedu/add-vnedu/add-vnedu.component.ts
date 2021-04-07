import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-add-vnedu',
  templateUrl: './add-vnedu.component.html',
  styleUrls: ['./add-vnedu.component.scss']
})
export class AddVneduComponent implements OnInit {
  listOfUser: any = [];
  vnEduForm: FormGroup;
  selectedId: string;
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
    this.vnEduForm = new FormGroup({
      moduleName: new FormControl('SLLĐT'),
      schoolYear: new FormControl(),
      amountSLL: new FormControl(),
      remark: new FormControl(),
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
    this.eduEcosystemsServices.pushModuleSLL(this.selectedId, { payload: this.vnEduForm.value }).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  close() {
    this.modal.close();
  }
}
