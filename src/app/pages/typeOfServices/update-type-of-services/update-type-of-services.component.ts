import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';

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
    private modal: NzModalRef
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
      this.TypeOfServiceAPI.UpdateTypeOfService(this.typeOfService._id, this.typeofserviceForm.value).subscribe(res => {
      });
    }
  }

  close() {
    this.modal.destroy();
  }

}
