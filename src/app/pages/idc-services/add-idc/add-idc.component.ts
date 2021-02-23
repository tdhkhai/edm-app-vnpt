import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DausoService } from 'src/app/core/services/dauso.service';
import { IDCService } from 'src/app/core/services/idc.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-idc',
  templateUrl: './add-idc.component.html',
  styleUrls: ['./add-idc.component.scss']
})
export class AddIdcComponent implements OnInit {
  listOfUser: any = [];
  idcForm: FormGroup;
  registrationDate: Date;
  expirationDate: Date;
  cancelnDate: Date;
  incomeDate: Date;

  constructor(
    private idcAPI: IDCService,
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
    this.idcForm = new FormGroup({
      comTaxCode: new FormControl(),
      comName: new FormControl(),
      loaiIDC: new FormControl(),
      bundle: new FormControl(),
      registrationDate: new FormControl(Date()),
      expirationDate: new FormControl(Date()),
      incomeDate: new FormControl(Date()),
      income: new FormControl(),
      extend: new FormControl(),
      cancelDate: new FormControl(),
      am: new FormControl(),
      status: new FormControl(),
      remark: new FormControl(),
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
    // console.log(this.dausoForm.value);
    this.idcForm.value.status = '1';
    this.idcAPI.AddIDC(this.idcForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }



}
