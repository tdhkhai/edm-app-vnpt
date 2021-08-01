import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import * as XLSX from 'xlsx';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-import-module',
  templateUrl: './import-module.component.html',
  styleUrls: ['./import-module.component.scss']
})
export class ImportModuleComponent implements OnInit {

  constructor(
    private eduEcosystemsServices: EduEcosystemsService,
    private modalService: NzModalService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
  }

  importExcel(moduleName: string) {
    const modal = this.modalService.create({
      nzTitle: 'Import dữ liệu',
      nzContent: UploadComponent,
      nzWidth: 400,
    });

    modal.afterClose.subscribe(result => {
      this.handleImport(result, moduleName);
    });

  }

  handleImport(file: File, moduleName: string): any {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'mm/dd/yyyy' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      // tslint:disable-next-line: max-line-length
      const data = XLSX.utils.sheet_to_json(ws, { raw: false });
      // to get 2d array pass 2nd parameter as object {header: 1}
      // console.log(data); // Data will be logged in array format containing objects
      // console.log(typeof(data));

      if (moduleName === 'SLLĐT') {
        this.importData_SLL(data, moduleName);
      } else {
        this.importModules(data, moduleName);
      }

    }
  }

  importData_SLL(data: any, moduleName: string) {
    data.forEach(element => {
      // element.moduleName = moduleName;
      const school = {
        id_moet: element.id_moet,
        payload: {
          moduleName,
          loaiHD_SLL: element.loaiHD_SLL,
          schoolYear: element.schoolYear,
          amountSLL: element.amountSLL,
          income: element.amountSLL,
          status: 1
        }
      };
      this.eduEcosystemsServices.importPushModuleSLL(school).subscribe(res => {

        this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });

    });
  }

  importModules(data: any, moduleName: string) {
    data.forEach(element => {
      // element.moduleName = moduleName;
      const school = {
        id_moet: element.id_moet,
        payload: {
          moduleName,
          fromDate_toDate: [element.fromDate, element.toDate],
          income: element.income,
          incomeDate: element.incomeDate,
          thoihanhopdong: element.thoihanhopdong,
          status: 1
        }
      };
      this.eduEcosystemsServices.importPushModuleSLL(school).subscribe(res => {

        this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });

    });
  }

}
