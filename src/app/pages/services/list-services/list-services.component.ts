import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TypeOfService } from 'src/app/core/models/typeofservice';
import { ServicesService } from 'src/app/core/services/services.service';
import { CreateServicesComponent } from '../create-services/create-services.component';
import { UpdateServicesComponent } from '../update-services/update-services.component';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.scss']
})
export class ListServicesComponent implements OnInit {

  listOfData: any = [];

  constructor(
    public dialog: MatDialog,
    private ServiceAPI: ServicesService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getAllServices();
  }

  showCreate(): void {
    const dialogRef = this.dialog.open(CreateServicesComponent, {
      height: '435px',
      width: '550px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllServices();
    });
  }

  showUpdate(data): void {
    const dialogRef = this.dialog.open(UpdateServicesComponent, {
      height: '435px',
      width: '550px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllServices();
    });
  }

  getAllServices() {
    this.ServiceAPI.GetAllServices().subscribe(
      (data) => {
        this.listOfData = data;
      }
    );
  }

  cancel(): void {
  }

  confirmDelete(data: TypeOfService): void {
    this.ServiceAPI.DeleteService(data._id).subscribe((res) => {
      this.getAllServices();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa dịch vụ thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }
}
