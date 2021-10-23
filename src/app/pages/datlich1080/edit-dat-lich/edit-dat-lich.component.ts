import { Component, OnInit } from '@angular/core';
import { FormControlDirective, FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Datlich1080Service } from 'src/app/core/services/datlich1080.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-dat-lich',
  templateUrl: './edit-dat-lich.component.html',
  styleUrls: ['./edit-dat-lich.component.scss']
})
export class EditDatLichComponent implements OnInit {
  selectedId: string;
  selectedData: any;
  listOfUser: any = [];
  datlich1080Form: FormGroup;
  registrationDate: Date;
  cancelDate: Date;
  isSpinning: boolean;
  constructor(
    private datlich1080API: Datlich1080Service,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private userAPI: UserService
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.datlich1080API.GetDatlich(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          this.datlich1080Form = new FormGroup({
            am: new FormControl(data.am),
            comTaxCode: new FormControl(data.comTaxCode),
            comName: new FormControl(data.comName),
            registrationDate: new FormControl(data.registrationDate),
            cancelDate: new FormControl(data.cancelDate),
            remark: new FormControl(data.remark),
          });
        }
      );
    }, 1000);

  }

  ngOnInit(): void {
    this.getAllUsersActivated();
    this.setForm();
  }

  getAllUsersActivated() {
    this.userAPI.GetUsersActivated().subscribe(
      (data) => {
        this.listOfUser = data;
        // console.log(this.listOfUser);
      }
    );
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

  compareByOptionId(c1, c2) {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  close() {
    this.modal.destroy();
  }

  submitForm() {
    // console.log(this.selectedId);
    // this.datlich1080Form.value.status = '1';
    this.datlich1080API.UpdateDatlich(this.selectedId, this.datlich1080Form.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

}
