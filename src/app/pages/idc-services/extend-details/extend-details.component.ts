import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IDCService } from 'src/app/core/services/idc.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-extend-details',
  templateUrl: './extend-details.component.html',
  styleUrls: ['./extend-details.component.scss']
})
export class ExtendDetailsComponent implements OnInit {
  listOfUser: any = [];
  extendForm: FormGroup;
  incomeDate: Date;
  fromDate: Date;
  toDate: Date;
  selectedId: string;
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private idcAPI: IDCService,
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
    });
  }

  getRandomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  submitForm() {
    // console.log(this.extendForm.value);
    this.extendForm.value._id = this.getRandomNumberBetween(1, 5000).toString();
    // console.log(typeof this.extendForm.value._id);

    const tmp = {
      status: '2',
      extend: this.extendForm.value
    };
    this.idcAPI.pushExtendIDC(this.selectedId, tmp).subscribe(
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
