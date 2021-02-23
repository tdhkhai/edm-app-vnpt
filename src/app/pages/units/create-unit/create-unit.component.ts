import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UnitService } from 'src/app/core/services/unit.service';

@Component({
  selector: 'app-create-unit',
  templateUrl: './create-unit.component.html',
  styleUrls: ['./create-unit.component.scss']
})
export class CreateUnitComponent implements OnInit {
  unitForm: FormGroup;

  constructor(
    private unitAPI: UnitService
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

  // /* Date */
  // formatDate(e) {
  //   const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
  //   this.unitForm.get('createdAt').setValue(convertDate, {
  //     onlyself: true
  //   });
  // }

  submitUnitForm() {
    if (this.unitForm.valid) {
      this.unitAPI.AddUnit(this.unitForm.value).subscribe(res => {
        // this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
        // console.log("OK");
      });
    }
  }
}
