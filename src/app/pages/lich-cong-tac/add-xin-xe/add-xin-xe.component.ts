import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { XinxeService } from 'src/app/core/services/xinxe.service';

@Component({
  selector: 'app-add-xin-xe',
  templateUrl: './add-xin-xe.component.html',
  styleUrls: ['./add-xin-xe.component.scss']
})
export class AddXinXeComponent implements OnInit {
  listOfUser: any = [];
  xinxeForm: FormGroup;
  bussinessDate: null;

  constructor(
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private xinxeAPI: XinxeService,
  ) {
    this.setForm();
  }

  ngOnInit(): void {
  }

  setForm() {
    this.xinxeForm = new FormGroup({
      noidi: new FormControl(''),
      noiden: new FormControl(''),
      noidung: new FormControl(''),
      km_di: new FormControl(''),
      km_ve: new FormControl(''),
      so_km: new FormControl(''),
      so_lit: new FormControl(''),
      ngaydi_ve: new FormControl(''),
    });
  }

  submitForm() {
    this.xinxeForm.value.so_km = this.xinxeForm.value.km_ve - this.xinxeForm.value.km_di;
    if (this.xinxeForm.value.so_km >= 0) {
      this.xinxeForm.value.so_lit = this.xinxeForm.value.so_km / 100 * 16;
    }

    this.xinxeAPI.AddXinxe(this.xinxeForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  close() { this.modal.close(); }

}
