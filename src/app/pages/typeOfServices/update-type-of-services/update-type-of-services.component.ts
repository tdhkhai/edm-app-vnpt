import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TypeOfService } from 'src/app/core/models/typeofservice';
import { TypeOfServicesService } from 'src/app/core/services/typeofservices.service';

@Component({
  selector: 'app-update-type-of-services',
  templateUrl: './update-type-of-services.component.html',
  styleUrls: ['./update-type-of-services.component.scss']
})
export class UpdateTypeOfServicesComponent implements OnInit {

  typeofserviceForm: FormGroup;
  typeOfService: TypeOfService;
  constructor(
    private TypeOfServiceAPI: TypeOfServicesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.buildUnitForm();
    this.typeOfService = this.data;
  }

  buildUnitForm() {
    this.typeofserviceForm = new FormGroup({
      typeOfServiceCode: new FormControl(''),
      typeOfServiceName: new FormControl(''),
      status: new FormControl(true),
      createdAt: new FormControl(Date()),
    });
  }

  submitUnitForm() {
    if (this.typeofserviceForm.valid) {
      this.TypeOfServiceAPI.UpdateTypeOfService(this.typeOfService._id, this.typeofserviceForm.value).subscribe(res => {
      });
    }
  }

}
