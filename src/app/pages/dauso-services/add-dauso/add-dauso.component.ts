import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DausoService } from 'src/app/core/services/dauso.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-dauso',
  templateUrl: './add-dauso.component.html',
  styleUrls: ['./add-dauso.component.scss']
})
export class AddDausoComponent implements OnInit {
  listOfUser: any = [];
  dausoForm: FormGroup;
  registrationDate: Date;
  cancelDate: Date;
  constructor(
    private dausoAPI: DausoService,
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
    this.dausoForm = new FormGroup({
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

  close() { }

  submitForm() {
    // console.log(this.dausoForm.value);
    this.dausoForm.value.status = "1";
    this.dausoAPI.AddDauso(this.dausoForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

}
