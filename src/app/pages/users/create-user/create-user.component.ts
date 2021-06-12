import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UnitService } from 'src/app/core/services/unit.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-creat-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreatUserComponent implements OnInit {
  listOfUnit: any = [];
  userForm: FormGroup;
  dateFormat = 'dd/MM/yyyy';

  constructor(
    private unitAPI: UnitService,
    private userAPI: UserService,
    private modal: NzModalRef,
    private notification: NzNotificationService,
    ) {}

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
      this.userAPI.AddUser(this.userForm.value).subscribe(res => {
        this.notification.create('success', 'Thành công', 'Bạn đã thêm thành công!');
        this.modal.destroy();
      }, err => {
        console.log(err);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
    }
}
