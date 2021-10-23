import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SSLService } from 'src/app/core/services/ssl.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-ssl',
  templateUrl: './add-ssl.component.html',
  styleUrls: ['./add-ssl.component.scss']
})
export class AddSslComponent implements OnInit {
  listOfUser: any = [];
  sslForm: FormGroup;
  registrationDate: Date;
  expirationDate: Date;
  cancelnDate: Date;
  incomeDate: Date;
  listTypeOfCustomer = [
    'Doanh nghiệp',
    'Giáo dục',
    'Tổ chức',
  ];

  listDetailTypeOfCustomer = [
    'Mầm non/Mẫu giáo',
    'Tiểu học',
    'THCS',
    'THPT',
    'THCS & THPT',
  ];

  isEducation = false;

  constructor(
    private sslAPI: SSLService,
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
    this.sslForm = new FormGroup({
      comTaxCode: new FormControl(),
      comName: new FormControl(),
      bundle: new FormControl(),
      domain: new FormControl(),
      registrationDate: new FormControl(Date()),
      expirationDate: new FormControl(Date()),
      incomeDate: new FormControl(Date()),
      income: new FormControl(),
      extend: new FormControl([]),
      cancelDate: new FormControl(),
      am: new FormControl(),
      status: new FormControl(),
      remark: new FormControl(),
      typeOfCustomer: new FormControl(),
      detailTypeOfCustomer: new FormControl(),
    });
  }

  getAllUsersActivated() {
    this.userAPI.GetUsersActivated().subscribe(
      (data) => {
        this.listOfUser = data;
      }
    );
  }

  close() { this.modal.close(); }

  submitForm() {
    // console.log(this.sslForm.value);
    this.sslForm.value.status = '1';
    this.sslAPI.AddSSL(this.sslForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

  ngModelChange(e) {
    if (e.typeOfCustomer === 'Giáo dục') {
      this.isEducation = true;
    } else {
      this.isEducation = false;
    }

  }

}
