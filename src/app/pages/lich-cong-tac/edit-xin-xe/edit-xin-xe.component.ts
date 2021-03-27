import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { XinxeService } from 'src/app/core/services/xinxe.service';

@Component({
  selector: 'app-edit-xin-xe',
  templateUrl: './edit-xin-xe.component.html',
  styleUrls: ['./edit-xin-xe.component.scss']
})
export class EditXinXeComponent implements OnInit {
  selectedId: string;
  selectedData: any;
  listOfUser: any = [];
  xinxeForm: FormGroup;
  bussinessDate: null;
  isSpinning = false;
  constructor(
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private xinxeAPI: XinxeService
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.xinxeAPI.GetXinxe(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          this.xinxeForm = new FormGroup({
            noidi: new FormControl(data.noidi),
            noiden: new FormControl(data.noiden),
            noidung: new FormControl(data.noidung),
            km_di: new FormControl(data.km_di),
            km_ve: new FormControl(data.km_ve),
            so_km: new FormControl(data.so_km),
            so_lit: new FormControl(data.so_lit),
            ngaydi_ve: new FormControl(data.ngaydi_ve),
          });
          // console.log(this.domainForm.value);

        }
      );
    }, 1000);
  }

  ngOnInit(): void {
    this.setForm();
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

  close() { this.modal.close(); }

  submitForm() {
    this.xinxeForm.value.so_km = this.xinxeForm.value.km_ve - this.xinxeForm.value.km_di;
    if (this.xinxeForm.value.so_km >= 0) {
      this.xinxeForm.value.so_lit = this.xinxeForm.value.so_km / 100 * 16;
    }
    this.xinxeAPI.UpdateXinXe(this.selectedId, this.xinxeForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã cập nhật thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

}
