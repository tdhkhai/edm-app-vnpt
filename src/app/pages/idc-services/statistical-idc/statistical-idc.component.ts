import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IDC } from '../../../core/models/idc';
import { ExcelToFileService } from '../../../core/services/exceltofile.service';
import { IDCService } from '../../../core/services/idc.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { AddIdcComponent } from '../add-idc/add-idc.component';
import { EditIdcComponent } from '../edit-idc/edit-idc.component';
import { ExtendDetailsComponent } from '../extend-details/extend-details.component';
import * as XLSX from 'xlsx';
import * as Excel from 'exceljs/dist/exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-statistical-idc',
  templateUrl: './statistical-idc.component.html',
  styleUrls: ['./statistical-idc.component.scss']
})
export class StatisticalIdcComponent implements OnInit {
  listOfData: any = [];
  listOfAllData: any = [];
  loading = false;
  selectedId: string;
  searchValue = '';
  visible = false;
  expandSet = new Set<string>();
  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private idcAPI: IDCService
  ) { }

  ngOnInit(): void {
    this.getAllIDCs();
  }

  getAllIDCs() {
    this.loading = true;
    this.idcAPI.GetAllIDCs().subscribe(
      (data) => {
        this.listOfData = data;
        this.listOfAllData = data;
        // console.log(data[0].extend[data[0].extend.length - 1].toDate);

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
        (item: IDC) =>
          item.comName.includes(filterValue) ||
          item.am.unit.unitCode.includes(filterValue) ||
          item.comTaxCode.includes(filterValue) ||
          item.am.userName.includes(filterValue)
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

  exportExcel() {
    // this.excelToFile.exportExcel(this.listOfData, 'danh_sach_idc');
    const wb = new Excel.Workbook();
    const ws = wb.addWorksheet('Sheet1');
    // const ws = wb.getWorksheet('Sheet1');

    const header = ['STT', 'Trạng thái', 'Đơn vị', 'AM', 'Tên Khách hàng', 'MST', 'Ngày đăng ký', 'Ngày hết hạn']

    const headerRow = ws.addRow(header);

    let i = 0;
    let status = '';
    let expDate = new Date();
    this.listOfData.forEach(element => {
      i += 1;
      switch (element.status) {
        case '1': { status = 'Mới'; break; }
        case '2': { status = 'Gia hạn'; break; }
        case '3': { status = 'Thanh lý'; break; }
        default: break;
      }

      // if (element.extend != null || element.extend !== [] || 'extend' in element === false) {
      //   // expDate = element.extend[element.extend.length - 1];
      //   console.log(element.extend[element.extend.length - 1]);

      // } else {
      //   expDate = element.expirationDate;
      // }
      const rowValues = [
        i,
        status,
        element.am.unit.unitCode,
        element.am.userName,
        element.comName,
        element.comTaxCode,
        new Date(element.registrationDate),
        new Date(expDate),
      ];

      ws.addRow(rowValues);
    });

    // Format Cell
    ws.eachRow((row, rowNumber) => {
      row.eachCell((cell, number) => {
        if (rowNumber == 1) {
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
      fs.saveAs(blob, 'Danh sách KH IDC.xlsx');
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
      // console.log(data); // Data will be logged in array format containing objects
      // console.log(typeof(data));
      // this.importDataImport(data);
    };
  }

  // importDataImport(data: any) {
  //   data.forEach(element => {

  //     element.incomeDate = moment(element.incomeDate).toISOString();
  //     element.comName = element.comName.toUpperCase();

  //     this.invoiceAPI.AddInvoice(element).subscribe(res => {
  //       this.getAllInvoices();
  //       this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
  //     }, (error) => {
  //       console.log(error);
  //       this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
  //     });
  //   });
  // }

  showCreate() {
    const modal = this.modalService.create({
      nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ HẠ TẦNG LƯU TRỮ',
      nzContent: AddIdcComponent,
      nzWidth: 800,
    });

    modal.afterClose.subscribe(res => {
      this.getAllIDCs();
    });

  }

  openExtendDetails(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'THÔNG TIN GIA HẠN DỊCH VỤ',
      nzContent: ExtendDetailsComponent,
      nzWidth: 800,
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllIDCs();
    });
  }

  deleteExtend(id: string, data: string) {
    this.idcAPI.pullExtendIDC(id, { _id: data }).subscribe(
      (res) => {
        this.getAllIDCs();
        this.notification.create('success', 'Thành công', 'Bạn đã xóa gia hạn thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      }
    );
  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ HẠ TẦNG LƯU TRỮ',
      nzContent: EditIdcComponent,
      nzWidth: 800,
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllIDCs();
    });
  }

  confirmDelete(data) {
    this.idcAPI.DeleteIDC(data._id).subscribe((res) => {
      this.getAllIDCs();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }


}
