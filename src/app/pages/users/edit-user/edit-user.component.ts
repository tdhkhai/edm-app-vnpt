import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UnitService } from 'src/app/core/services/unit.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  listOfUnit: any = [];
  userForm: FormGroup;
  dateFormat = 'dd/MM/yyyy';
  isSpinning: boolean;
  selectedId: string;
  selectedData: any;

  constructor(
    private unitAPI: UnitService,
    private userAPI: UserService,
    private modal: NzModalRef,
    private notification: NzNotificationService,
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.userAPI.GetUser(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          this.userForm = new FormGroup({
            unit: new FormControl(data.unit),
            userCode: new FormControl(data.userCode),
            userName: new FormControl(data.userName),
            status: new FormControl(data.status),
            createdAt: new FormControl(data.createdAt),
          });

        }
      );
    }, 1000);
  }

  ngOnInit(): void {
    this.getAllUnits();
    this.buildUserForm();
  }

  buildUserForm() {
    this.userForm = new FormGroup({
      unit: new FormControl(''),
      userCode: new FormControl(''),
      userName: new FormControl(''),
      status: new FormControl(true),
      createdAt: new FormControl(Date()),
    });
  }

  getAllUnits() {
    this.unitAPI.GetUnitsActivated().subscribe(
      (data) => {
        this.listOfUnit = data;
      }
    );
  }

  close() {
    this.modal.destroy();
  }

  submitForm() {
    this.userAPI.UpdateUser(this.selectedId, this.userForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã cập nhật thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }
}
