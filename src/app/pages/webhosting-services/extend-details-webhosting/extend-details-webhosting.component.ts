import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { WebhostingService } from 'src/app/core/services/webhosting.service';

@Component({
  selector: 'app-extend-details-webhosting',
  templateUrl: './extend-details-webhosting.component.html',
  styleUrls: ['./extend-details-webhosting.component.scss']
})
export class ExtendDetailsWebhostingComponent implements OnInit {
  extendForm: FormGroup;
  incomeDate: Date;
  fromDate: Date;
  toDate: Date;
  selectedId: string;
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private webhostingAPI: WebhostingService
  ) { this.setForm(); }

  ngOnInit(): void {
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

    this.webhostingAPI.pushExtendWebhosting(this.selectedId, tmp).subscribe(
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
