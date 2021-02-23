import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from 'src/app/core/models/unit';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-update-unit',
  templateUrl: './update-unit.component.html',
  styleUrls: ['./update-unit.component.scss']
})
export class UpdateUnitComponent implements OnInit {
  unitForm: FormGroup;
  unit: Unit;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private unitAPI: UnitService) { }

  ngOnInit(): void {
    this.buildUnitForm();
    this.unit = this.data;
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

}
