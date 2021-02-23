import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ServicesService } from 'src/app/core/services/services.service';
import { TypeOfServicesService } from 'src/app/core/services/typeofservices.service';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.scss']
})
export class CreateServicesComponent implements OnInit {
  listOfData: any = [];

  serviceForm: FormGroup;
  inputValue?: string;
  options: Array<{ value: string; category: string; count: number }> = [];

  constructor(
    private ServiceAPI: ServicesService,
    private typeOfSerice: TypeOfServicesService
    ) { }

  ngOnInit(): void {
    this.buildUnitForm();
    this.getAllTypeOfServicesActivated();
  }

  buildUnitForm() {
    this.serviceForm = new FormGroup({
      serviceCode: new FormControl(''),
      serviceName: new FormControl(''),
      serviceBrand: new FormControl(''),
      typeOfService: new FormControl(''),
      status: new FormControl(true),
      createdAt: new FormControl(Date()),
    });
  }

  getAllTypeOfServicesActivated(){
    this.typeOfSerice.GetAllTypeOfServiceActivated().subscribe(data => {
      this.listOfData = data;
    });
  }

  submitForm() {
    if (this.serviceForm.valid) {
      this.ServiceAPI.AddService(this.serviceForm.value).subscribe(res => {
      });
    }
  }

}
