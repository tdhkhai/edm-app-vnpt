import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Dauso } from 'src/app/core/models/dauso';
import { User } from 'src/app/core/models/user';
import { DausoService } from 'src/app/core/services/dauso.service';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-dauso',
  templateUrl: './edit-dauso.component.html',
  styleUrls: ['./edit-dauso.component.scss']
})
export class EditDausoComponent implements OnInit {
  selectedId: string;
  selectedData: Dauso;
  listOfUser: any = [];
  dausoForm: FormGroup;

  registrationDate: Date;
  cancelDate: Date;
  isSpinning = false;
  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private dausoAPI: DausoService,
    private userAPI: UserService,
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.dausoAPI.GetDauso(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          this.dausoForm = new FormGroup({
            loaiDauso: new FormControl(data.loaiDauso),
            dauso: new FormControl(data.dauso),
            status: new FormControl(data.status),
            am: new FormControl(data.am),
            comTaxCode: new FormControl(data.comTaxCode),
            comName: new FormControl(data.comName),
            registrationDate: new FormControl(data.registrationDate),
            cancelDate: new FormControl(data.cancelDate),
            remark: new FormControl(data.remark),
          });
          // console.log(this.dausoForm.value);

        }
      );
    }, 1000);
  }

  ngOnInit(): void {
    this.getAllUsersActivated();
    this.setForm();
  }

  setForm() {
    this.dausoForm = new FormGroup({
      loaiDauso: new FormControl(),
      dauso: new FormControl(),
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
      }
    );
  }

  getDausobyId() {
    this.dausoAPI.GetDauso(this.selectedId).subscribe(
      (data) => {
        this.selectedData = data;
      }
    );
  }

  compareByOptionId(c1, c2) {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  close() {
    this.modal.destroy();
  }

  submitForm() {

    this.dausoAPI.UpdateDauso(this.selectedId, this.dausoForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã cập nhật thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

}
