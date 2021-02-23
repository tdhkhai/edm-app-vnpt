import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { TypeOfService } from 'src/app/core/models/typeofservice';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { TypeOfServicesService } from 'src/app/core/services/typeofservices.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { CreateTypeOfServicesComponent } from '../create-type-of-services/create-type-of-services.component';
import { UpdateTypeOfServicesComponent } from '../update-type-of-services/update-type-of-services.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-type-of-services',
  templateUrl: './list-type-of-services.component.html',
  styleUrls: ['./list-type-of-services.component.scss']
})
export class ListTypeOfServicesComponent implements OnInit {
  listOfData: any = [];

  constructor(
    public dialog: MatDialog,
    private TypeOfServiceAPI: TypeOfServicesService,
    private notification: NzNotificationService,
    private excelToFile: ExcelToFileService
  ) { }

  ngOnInit(): void {
    this.getAllTypeOfServices();
  }

  showCreate(): void {
    const dialogRef = this.dialog.open(CreateTypeOfServicesComponent, {
      height: '300px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTypeOfServices();
    });

  }

  showUpdate(data): void {
    const dialogRef = this.dialog.open(UpdateTypeOfServicesComponent, {
      height: '300px',
      width: '500px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllTypeOfServices();
    });

  }

  getAllTypeOfServices() {
    this.TypeOfServiceAPI.GetAllTypeOfService().subscribe(
      (data) => {
        this.listOfData = data;
      }
    );
  }

  cancel(): void {
  }

  confirmDelete(data: TypeOfService): void {
    this.TypeOfServiceAPI.DeleteTypeOfService(data._id).subscribe((res) => {
      this.getAllTypeOfServices();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa loại dịch vụ thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_loai_dich_vu');
  }

  importExcel() {
    const dialogRef = this.dialog.open(UploadComponent, {
      height: '250px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(result);
      if (result !== 'undefined') {
        this.handleImport(result);
      }
    });
  }

  handleImport(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      // console.log(data); // Data will be logged in array format containing objects

      this.importDataImport(data);
    };
  }

  importDataImport(data: any) {
    data.forEach(element => {
      // tslint:disable-next-line: no-string-literal
      element['createdAt'] = Date.now();
      this.TypeOfServiceAPI.AddTypeOfService(element).subscribe(res => {
        this.getAllTypeOfServices();
        this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
    });
  }
}
