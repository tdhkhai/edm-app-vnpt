import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Unit } from '../../../core/models/unit';
import { UnitService } from '../../../core/services/unit.service';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.scss']
})
export class UpdateUnitComponent implements OnInit {
  unitForm: FormGroup;
  unit: Unit;
  constructor(
    private unitAPI: UnitService,
    private modal: NzModalRef
    ) { }

  ngOnInit(): void {
    this.buildUnitForm();
  }

  buildUnitForm() {
    this.unitForm = new FormGroup({
      unitCode: new FormControl(''),
      unitName: new FormControl(''),
      status: new FormControl(true),
      createdAt: new FormControl(Date()),
    });
  }

  submitUnitForm() {
    if (this.unitForm.valid) {
      this.unitAPI.UpdateUnit(this.unit._id, this.unitForm.value).subscribe(res => {
        // this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
        // console.log("OK");
      });
    }
  }

  close() {
    this.modal.destroy();
  }

}
