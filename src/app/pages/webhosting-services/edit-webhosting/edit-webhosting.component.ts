import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UserService } from 'src/app/core/services/user.service';
import { WebhostingService } from 'src/app/core/services/webhosting.service';

@Component({
  selector: 'app-edit-webhosting',
  templateUrl: './edit-webhosting.component.html',
  styleUrls: ['./edit-webhosting.component.scss']
})
export class EditWebhostingComponent implements OnInit {
  selectedId: string;
  selectedData: any;
  listOfUser: any = [];
  webhostingForm: FormGroup;
  registrationDate: Date;
  expirationDate: Date;
  cancelnDate: Date;
  incomeDate: Date;
  isSpinning = false;

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
    this.isSpinning = true;
    setTimeout(() => {
      this.webhostingAPI.GetWebhosting(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          this.webhostingForm = new FormGroup({
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
          });
          // console.log(this.webhostingForm.value);

        }
      );
    }, 1000);
  }

  ngOnInit(): void {
    this.setForm();
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
      cancelDate: new FormControl(Date()),
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
    this.webhostingForm.value.status = '1';
    this.webhostingAPI.UpdateWebhosting(this.selectedId, this.webhostingForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã cập nhật thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

  compareByOptionId(c1, c2) {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }


}
