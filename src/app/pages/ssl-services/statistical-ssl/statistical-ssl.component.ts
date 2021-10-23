import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs/dist/exceljs';
import * as fs from 'file-saver';
import * as moment from 'moment';
import { SSL } from '../../../core/models/ssl';
import { SSLService } from 'src/app/core/services/ssl.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AddSslComponent } from '../add-ssl/add-ssl.component';
import { EditSslComponent } from '../edit-ssl/edit-ssl.component';
import { UploadComponent } from '../../shared/upload/upload.component';
import { ExtendDetailsSslComponent } from '../extend-details-ssl/extend-details-ssl.component';

@Component({
  selector: 'app-statistical-ssl',
  templateUrl: './statistical-ssl.component.html',
  styleUrls: ['./statistical-ssl.component.scss']
})
export class StatisticalSslComponent implements OnInit {
  exportData: any = [];
  listOfData: any = [];
  listOfAllData: any = [];
  loading = false;
  selectedId: string;
  searchValue = '';
  visible = false;
  expandSet = new Set<string>();
  ssl: SSL;
  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private sslAPI: SSLService
  ) { }

  ngOnInit(): void {
    this.getAllSSLs();
  }

  getAllSSLs() {
    this.loading = true;
    this.sslAPI.GetAllSSLs().subscribe(
      (data) => {
        this.listOfData = data;
        this.listOfAllData = data;
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.listOfData = this.listOfAllData;
    }
    else {
      this.listOfData = this.listOfAllData.filter(
        (item: SSL) =>
          item.comName.includes(filterValue) ||
          item.am.userName.includes(filterValue) ||
          item.domain.includes(filterValue)
      );
    }
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

  openExtendDetails(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'THÔNG TIN GIA HẠN DỊCH VỤ',
      nzContent: ExtendDetailsSslComponent,
      nzWidth: 800,
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllSSLs();
    });
  }

  deleteExtend(id: string, data: string) {
    this.sslAPI.pullExtendSSL(id, { _id: data }).subscribe(
      (res) => {
        this.getAllSSLs();
        this.notification.create('success', 'Thành công', 'Bạn đã xóa gia hạn thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      }
    );
  }

  exportExcel(type: string) {
    const year = new Date().getFullYear().toString();

    switch (type) {
      case 'all':
        this.sslAPI.GetAllSSLs().subscribe(
          (data) => {
            this.formatExport(data);
          }
        );
        break;

      case '1':
        this.sslAPI.GetListbyStatus({ year, status: '1' }).subscribe(
          (data) => {
            this.formatExport(data);
          }
        );
        break;

      case '3':
        this.sslAPI.GetListbyStatus({ year, status: '3' }).subscribe(
          (data) => {
            this.formatExport(data);
          }
        );
        break;

      default:
        break;
    }

  }

  formatExport(data) {
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Sheet1');

    const header = ['STT', 'Trạng thái', 'Đơn vị', 'AM', 'SSL', 'Tên Khách hàng', 'MST', 'Ngày đăng ký', 'Ngày hết hạn']

    const headerRow = ws.addRow(header);

    let i = 0;
    let status = '';
    // console.log(this.exportData);

    data.forEach(element => {
      i += 1;
      switch (element.status) {
        case '1': { status = 'Mới'; break; }
        case '2': { status = 'Gia hạn'; break; }
        case '3': { status = 'Thanh lý'; break; }
        default: break;
      }

      const rowValues = [
        i,
        status,
        element.am.unit.unitCode,
        element.am.userName,
        element.ssl,
        element.comName,
        element.comTaxCode,
        new Date(element.registrationDate),
        new Date(element.expirationDate),
      ];
      ws.addRow(rowValues);
    });

    // Format Cell
    ws.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        if (rowNumber === 1) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: {
              argb: 'FFFFFFFF'
            },
            bgColor: {
              argb: 'FFFFFFFF'
            },
          };
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'center'
          };
          cell.font = {
            color: {
              argb: '00000000',
            },
            bold: true
          };
        }
        cell.border = {
          top: {
            style: 'thin'
          },
          left: {
            style: 'thin'
          },
          bottom: {
            style: 'thin'
          },
          right: {
            style: 'thin'
          }
        };
      });
    });

    const sttCol = ws.getColumn('A');
    sttCol.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
    });

    const statusCol = ws.getColumn('B');
    statusCol.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
    });

    const sslCol = ws.getColumn('C');
    sslCol.eachCell((cell) => {
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
      cell.font = {
        bold: true
      }
    });

    // AutoFit Columns
    ws.columns.forEach((column) => {
      let maxColumnLength = 0;
      column.eachCell({ includeEmpty: true }, (cell) => {
        maxColumnLength = Math.max(
          maxColumnLength,
          10,
          cell.value ? cell.value.toString().length : 0
        );
      });
      column.width = maxColumnLength + 2;
    });

    wb.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      fs.saveAs(blob, 'Danh sách KH Tên miền.xlsx');
    });
  }

  importExcel() {
    const modal = this.modalService.create({
      nzTitle: 'Import dữ liệu',
      nzContent: UploadComponent,
      nzWidth: 400,
    });

    modal.afterClose.subscribe(result => {
      this.handleImport(result);
    });

  }

  handleImport(file: File): any {
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
      //console.log(data); // Data will be logged in array format containing objects
      // console.log(typeof(data));
      this.importDataImport(data);
    };
  }

  importDataImport(data: any) {
    data.forEach(element => {

      element.registrationDate = moment(element.registrationDate).toISOString();
      element.expirationDate = moment(element.expirationDate).toISOString();

      // this.sslAPI.AddSSL(element).subscribe(res => {
      //   this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      // }, (error) => {
      //   console.log(error);
      //   this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      // });
    });
    this.getAllSSLs();
  }

  showCreate() {
    const modal = this.modalService.create({
      nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ CHỨNG THƯ SỐ CHO WEBSITE',
      nzContent: AddSslComponent,
      nzWidth: 800,
    });

    modal.afterClose.subscribe(res => {
      this.getAllSSLs();
    });

  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ CHỨNG THƯ SỐ CHO WEBSITE',
      nzContent: EditSslComponent,
      nzWidth: 800,
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllSSLs();
    });
  }

  confirmDelete(data) {
    this.sslAPI.DeleteSSL(data._id).subscribe((res) => {
      this.getAllSSLs();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }


}
