import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-edit-school',
  templateUrl: './edit-school.component.html',
  styleUrls: ['./edit-school.component.scss']
})
export class EditSchoolComponent implements OnInit {
  listOfUnit: any = [];
  schoolForm: FormGroup;
  selectedId: string;
  isSpinning = false;
  selectedData: any;
  constructor(
    private eduEcosystemsServices: EduEcosystemsService,
    private notification: NzNotificationService,
    private modal: NzModalRef,
    private unitAPI: UnitService,
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.eduEcosystemsServices.GetSchool(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          this.schoolForm = new FormGroup({
            comTaxCode: new FormControl(data.comTaxCode),
            schoolTaxCode: new FormControl(data.schoolTaxCode),
            schoolName: new FormControl(data.schoolName),
            unit: new FormControl(data.unit),
            remark: new FormControl(data.remark),
          });
          // console.log(this.domainForm.value);

        }
      );
    }, 1000);
   }

  ngOnInit(): void {
    this.setForm();
    this.getAllUnits();
  }

  setForm() {
    this.schoolForm = new FormGroup({
      schoolTaxCode: new FormControl(),
      schoolName: new FormControl(),
      unit: new FormControl(),
      remark: new FormControl(),
      status: new FormControl('1'),
    });
  }

  getAllUnits() {
    this.unitAPI.GetUnits().subscribe(
      (data) => { this.listOfUnit = data; }
    );
  }

  close() { this.modal.close(); }

  submitForm() {
    // console.log(this.dausoForm.value);
    this.eduEcosystemsServices.UpdateSchool(this.selectedId, this.schoolForm.value).subscribe(res => {
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
