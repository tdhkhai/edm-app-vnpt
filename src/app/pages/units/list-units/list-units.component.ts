import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Unit } from 'src/app/core/models/unit';
import { UnitService } from 'src/app/core/services/unit.service';
import { CreateUnitComponent } from '../create-unit/create-unit.component';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { UpdateUnitComponent } from '../update-unit/update-unit.component';
import { UploadComponent } from '../../shared/upload/upload.component';
import * as XLSX from 'xlsx';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';

@Component({
  selector: 'app-list-units',
  templateUrl: './list-units.component.html',
  styleUrls: ['./list-units.component.scss']
})
export class ListUnitsComponent implements OnInit {
  listOfData: any = [];
  listDataImport: any = [];
  constructor(
    public dialog: MatDialog,
    private unitAPI: UnitService,
    private notification: NzNotificationService,
    private excelToFile: ExcelToFileService
  ) { }

  ngOnInit(): void {
    this.getAllUnits();
  }

  showCreate(): void {
    const dialogRef = this.dialog.open(CreateUnitComponent, {
      height: '300px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUnits();
    });

  }

  showUpdate(data): void {
    const dialogRef = this.dialog.open(UpdateUnitComponent, {
      height: '300px',
      width: '500px',
      data
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAllUnits();
    });

  }

  getAllUnits() {
    this.unitAPI.GetUnits().subscribe(
      (data) => {
        this.listOfData = data;
      }
    );
  }

  cancel(): void {
  }

  confirmDelete(data: Unit): void {
    this.unitAPI.DeleteUnit(data._id).subscribe((res) => {
      this.getAllUnits();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa Phòng - Ban thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_dich_vu');
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

  handleImport(file: File): any {
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
      // console.log(typeof(data));
      this.importDataImport(data);
    };
  }

  importDataImport(data: any) {
    data.forEach(element => {
      // tslint:disable-next-line: no-string-literal
      element['createdAt'] = Date.now();
      this.unitAPI.AddUnit(element).subscribe(res => {
        this.getAllUnits();
        this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
    });
  }

}
