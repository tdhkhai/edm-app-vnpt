import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { UnitService } from 'src/app/core/services/unit.service';
import { UserService } from 'src/app/core/services/user.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { CreatUserComponent } from '../create-user/create-user.component';
import * as XLSX from 'xlsx';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  listOfData: any = [];
  listDataImport: any = [];

  constructor(
    public dialog: MatDialog,
    private unitAPI: UnitService,
    private userAPI: UserService,
    private notification: NzNotificationService,
    private excelToFile: ExcelToFileService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userAPI.GetUsers().subscribe(
      (data) => {
        this.listOfData = data;
      }
    );
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_nguoi_dung');
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
      this.userAPI.AddUser(element).subscribe(res => {
        this.getAllUsers();
        this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
    });
  }

  showCreate(): void {
    const dialogRef = this.dialog.open(CreatUserComponent, {
      height: '500px',
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getAllUnits();
    });

  }

  cancel(): void {
  }

  confirmDelete(data: User): void {
    this.userAPI.DeleteUser(data._id).subscribe((res) => {
      this.getAllUsers();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa Phòng - Ban thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }
}
