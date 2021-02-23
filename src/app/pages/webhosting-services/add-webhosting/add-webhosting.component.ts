import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/services/user.service';
import { WebhostingService } from 'src/app/core/services/webhosting.service';

@Component({
  selector: 'app-add-webhosting',
  templateUrl: './add-webhosting.component.html',
  styleUrls: ['./add-webhosting.component.scss']
})
export class AddWebhostingComponent implements OnInit {
  listOfUser: any = [];
  webhostingForm: FormGroup;
  registrationDate: Date;
  expirationDate: Date;
  cancelnDate: Date;
  incomeDate: Date;

  listOfBundle: any = [
    { bundle: 'Medium' },
    { bundle: 'Advanced' },
    { bundle: 'Pro' },
    { bundle: 'Super' },
    { bundle: 'Max' },
  ];

  constructor(
    private webhostingAPI: WebhostingService,
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
    this.webhostingForm = new FormGroup({
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
    // console.log(this.webhostingForm.value);
    this.webhostingForm.value.status = '1';
    this.webhostingAPI.AddWebhosting(this.webhostingForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }


}
