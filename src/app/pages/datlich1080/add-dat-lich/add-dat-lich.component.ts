import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Datlich1080Service } from 'src/app/core/services/datlich1080.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-dat-lich',
  templateUrl: './add-dat-lich.component.html',
  styleUrls: ['./add-dat-lich.component.scss']
})
export class AddDatLichComponent implements OnInit {
  listOfUser: any = [];
  datlich1080Form: FormGroup;
  registrationDate: Date;
  cancelDate: Date;
  constructor(
    private datlich1080API: Datlich1080Service,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userAPI: UserService
  ) {
    this.setForm();
  }

  ngOnInit(): void {
    this.getAllUsersActivated();
  }

  setForm() {
    this.datlich1080Form = new FormGroup({
      loaiDauso: new FormControl(),
      dauso: new FormControl(),
      status: new FormControl(),
      am: new FormControl(),
      comTaxCode: new FormControl(),
      comName: new FormControl(),
      registrationDate: new FormControl(Date()),
      cancelDate: new FormControl(Date()),
      remark: new FormControl(),
    });
  }

  getAllUsersActivated() {
    this.userAPI.GetUsersActivated().subscribe(
      (data) => {
        this.listOfUser = data;
        // console.log(this.listOfUser);

      }
    );
  }

  close() {
    this.modal.close();
  }

  submitForm() {
    // console.log(this.dausoForm.value);
    this.datlich1080Form.value.status = '1';
    this.datlich1080API.AddDatlich(this.datlich1080Form.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

}
