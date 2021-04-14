import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.scss']
})
export class AddSchoolComponent implements OnInit {
  listOfUnit: any = [];
  schoolForm: FormGroup;

  constructor(
    private eduEcosystemsServices: EduEcosystemsService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private unitAPI: UnitService,
  ) {
    this.setForm();
  }

  ngOnInit(): void {
    this.getAllUnits();
  }

  setForm() {
    this.schoolForm = new FormGroup({
      schoolTaxCode: new FormControl(),
      id_vnedu: new FormControl(),
      id_moet: new FormControl(),
      schoolName: new FormControl(),
      unit: new FormControl(),
      remark: new FormControl(),
      status: new FormControl('1'),
      modules: new FormControl(null)
    });
  }

  getAllUnits() {
    this.unitAPI.GetUnits().subscribe(
      (data) => { this.listOfUnit = data; }
    );
  }

  submitForm() {
    this.schoolForm.value.schoolName = this.schoolForm.value.schoolName.toUpperCase();
    this.eduEcosystemsServices.AddSchool(this.schoolForm.value).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  close() { this.modal.close(); }

}
