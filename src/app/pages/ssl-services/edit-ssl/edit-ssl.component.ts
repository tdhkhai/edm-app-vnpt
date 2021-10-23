import { Component, OnInit } from '@angular/core';
import { FormControlName, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SSLService } from 'src/app/core/services/ssl.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-ssl',
  templateUrl: './edit-ssl.component.html',
  styleUrls: ['./edit-ssl.component.scss']
})
export class EditSslComponent implements OnInit {
  selectedId: string;
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
  isSpinning = false;
  constructor(
    private sslAPI: SSLService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userAPI: UserService,
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.sslAPI.GetSSL(this.selectedId).subscribe(data => {
        this.isSpinning = false;
        this.sslForm = new FormGroup({
          comTaxCode: new FormControl(data.comTaxCode),
          comName: new FormControl(data.comName),
          bundle: new FormControl(data.bundle),
          domain: new FormControl(data.domain),
          registrationDate: new FormControl(data.registrationDate),
          expirationDate: new FormControl(data.expirationDate),
          incomeDate: new FormControl(data.incomeDate),
          income: new FormControl(data.income),
          extend: new FormControl(data.extend),
          cancelDate: new FormControl(data.cancelDate),
          am: new FormControl(data.am),
          status: new FormControl(data.status),
          remark: new FormControl(data.remark),
          typeOfCustomer: new FormControl(data.typeOfCustomer),
          detailTypeOfCustomer: new FormControl(data.detailTypeOfCustomer),
        });
      });
    }, 1000);
  }

  ngOnInit(): void {
    this.setForm();
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
      extend: new FormControl(),
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
    // this.sslForm.value.status = '1';
    this.sslAPI.UpdateSSL(this.selectedId, this.sslForm.value).subscribe(res => {
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

  compareByOptionId(c1, c2) {
    return c1 && c2 ? c1.userName === c2.userName : c1 === c2;
  }
}
