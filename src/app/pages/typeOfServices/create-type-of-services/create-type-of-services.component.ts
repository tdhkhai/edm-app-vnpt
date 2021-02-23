import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TypeOfServicesService } from 'src/app/core/services/typeofservices.service';
import { TypeOfService } from 'src/app/core/models/typeofservice';
@Component({
  selector: 'app-create-type-of-services',
  templateUrl: './create-type-of-services.component.html',
  styleUrls: ['./create-type-of-services.component.scss']
})
export class CreateTypeOfServicesComponent implements OnInit {

  typeofserviceForm: FormGroup;

  constructor(
    private TypeOfServiceAPI: TypeOfServicesService
    ) { }

  ngOnInit(): void {
    this.buildUnitForm();
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
      this.TypeOfServiceAPI.AddTypeOfService(this.typeofserviceForm.value).subscribe(res => {
      });
    }
  }

}
