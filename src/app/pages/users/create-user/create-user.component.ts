import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UnitService } from 'src/app/core/services/unit.service';

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
    private unitAPI: UnitService
    ) {

     }

  ngOnInit(): void {
    this.getAllUnits();
    this.buildUserForm();
    console.log(this.listOfUnit);

  }

  buildUserForm() {
    this.userForm = new FormGroup({
      unitCode: new FormControl(''),
      unitName: new FormControl(''),
      userCode: new FormControl(''),
      userName: new FormControl(''),
      dob: new FormControl(Date()),
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

  submitUserForm() {
    // if (this.unitForm.valid) {
    //   this.unitAPI.AddUnit(this.unitForm.value).subscribe(res => {
    //     // this.ngZone.run(() => this.router.navigateByUrl('/students-list'))
    //     // console.log("OK");
    //   });
    // }

    console.log(this.userForm.value);

  }
}
