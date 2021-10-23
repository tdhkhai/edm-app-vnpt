import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SSLService } from 'src/app/core/services/ssl.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-extend-details-ssl',
  templateUrl: './extend-details-ssl.component.html',
  styleUrls: ['./extend-details-ssl.component.scss']
})
export class ExtendDetailsSslComponent implements OnInit {
  selectedId: string;
  listOfUser: any = [];
  extendForm: FormGroup;
  incomeDate: Date;
  fromDate: Date;
  toDate: Date;
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private sslAPI: SSLService,
    private userAPI: UserService,
  ) { this.setForm(); }

  ngOnInit(): void {
    this.getAllUsersActivated();
  }

  getAllUsersActivated() {
    this.userAPI.GetUsersActivated().subscribe(
      (data) => {
        this.listOfUser = data;
      }
    );
  }

  setForm() {
    this.extendForm = new FormGroup({
      _id: new FormControl(),
      numberOfExtend: new FormControl(),
      fromDate: new FormControl(),
      toDate: new FormControl(),
      incomeDate: new FormControl(),
      income: new FormControl(),
      remark: new FormControl(),
      am: new FormControl(),
    });
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  submitForm() {

    this.extendForm.value._id = this.getRandomNumberBetween(1, 5000).toString();

    const tmp = {
      status: '2',
      extend: this.extendForm.value
    };

    this.sslAPI.pushExtendSSL(this.selectedId, tmp).subscribe(
      (res) => {
        this.close();
        this.notification.create('success', 'Thành công', 'Bạn đã gia hạn thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      }
    );
  }

  close() {
    this.modal.close();
  }

}
