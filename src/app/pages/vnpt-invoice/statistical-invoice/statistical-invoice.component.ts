import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { AddStatisticalInvoiceComponent } from '../add-statistical-invoice/add-statistical-invoice.component';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { EditStaticticalInvoiceComponent } from '../edit-statictical-invoice/edit-statictical-invoice.component';
import { Invoice } from 'src/app/core/models/vnpt-invoice';
import { ListInvoiceByCusTaxCodeComponent } from '../list-invoice-by-com-tax-code/list-invoice-by-com-tax-code';

@Component({
  selector: 'app-statistical-invoice',
  templateUrl: './statistical-invoice.component.html',
  styleUrls: ['./statistical-invoice.component.scss']
})
export class StatisticalInvoiceComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 0;
  infoSite1: string;
  infoSite2: string;
  infoSite3: string;
  fileUpload: File;
  listOfData: any = [];
  listOfAllData: any = [];
  listInvoiceByComTaxCode: any = [];
  loading: boolean;
  isVisibleInfoSite = false;
  selectedData: any;
  searchValue = '';
  listOfCurrentPageData: any = [];
  isSpinning = false;

  dateSelected = new Date();
  today = new Date();
  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private invoiceAPI: InvoiceService,
    private modalService: NzModalService,
  ) {
    // this.dateSelected = new Date();
    this.getAllInvoices();

  }

  ngOnInit(): void {
    this.onChange(this.dateSelected);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    // let filterValueLower = filterValue.toLowerCase();

    if (filterValue === '') {
      this.listOfData = this.listOfAllData;
    }
    else {
      this.listOfData = this.listOfAllData.filter(
        (item: Invoice) =>
          item.comName.includes(filterValue) ||
          item.comTaxCode.includes(filterValue)
        // item.userName.includes(filterValue)
      );
    }
  }

  getAllInvoices() {
    this.loading = true;
    this.invoiceAPI.GetInvoices().subscribe(
      (data) => {
        this.listOfAllData = data;
        this.listOfData = data;
        this.loading = false;
      }
    );
  }

  showListIncomeByComTaxCode(selectedComTaxCode: string) {
    const modal = this.modalService.create({
      nzTitle: 'CÁC LẦN MUA BỔ SUNG HÓA ĐƠN ĐIỆN TỬ',
      nzContent: ListInvoiceByCusTaxCodeComponent,
      nzWidth: 1300,

    });
    this.invoiceAPI.GetListInvoiceByComTaxCode({ selectedComTaxCode }).subscribe((data) => {
      this.listInvoiceByComTaxCode = data;
    });

    modal.componentInstance.listOfData = this.listInvoiceByComTaxCode;
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'statistical_invoice');
  }

  importExcel() {
    const modal = this.modalService.create({
      nzTitle: 'Import dữ liệu',
      nzContent: UploadComponent,
      nzWidth: 400,
      nzBodyStyle: {
        height: '70px'
      },
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
      this.importDataImport(data);
    };
  }

  importDataImport(data: any) {
    data.forEach(element => {

      element.incomeDate = moment(element.incomeDate).toISOString();
      element.comName = element.comName.toUpperCase();

      element.am = {
        unitCode: element.unitCode,
        userName: element.userName
      };

      // console.log(element);

      this.invoiceAPI.AddInvoice(element).subscribe(res => {
        this.getAllInvoices();
        // this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
    });
  }

  showCreate() {
    const modal = this.modalService.create({
      nzTitle: 'KHÁCH HÀNG HÓA ĐƠN ĐIỆN TỬ MỚI',
      nzContent: AddStatisticalInvoiceComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '640px'
      },
    });

    modal.afterClose.subscribe(res => {
      this.getAllInvoices();
      this.onChange(this.dateSelected);
    });
  }

  confirmDelete(data) {

    this.invoiceAPI.DeleteInvoice(data).subscribe((res) => {
      this.getAllInvoices();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  editModal(data: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA THÔNG TIN KHÁCH HÀNG HÓA ĐƠN ĐIỆN TỬ',
      nzContent: EditStaticticalInvoiceComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '640px'
      },
    });

    modal.componentInstance.selectedId = data;

    modal.afterClose.subscribe(res => {
      this.getAllInvoices();
    });
  }

  cancel() { }

  closeModal() { this.isVisibleInfoSite = false; }

  showInfoSite(data) {
    this.isVisibleInfoSite = true;
    this.selectedData = data;
  }

  infoSiteChange(status: string) {
    if (status === 'Demo') {
      this.infoSite1 = '[DEMO] ' + this.selectedData.comName;
      this.infoSite2 = this.selectedData.comTaxCode + '-democadmin.vnpt-invoice.com.vn/';
      this.infoSite3 = this.selectedData.comTaxCode + '_admin_demo';
    } else {
      this.infoSite1 = '[CHÍNH THỨC] ' + this.selectedData.comName;
      this.infoSite2 = this.selectedData.comTaxCode + '-cadmin.vnpt-invoice.com.vn/';
      this.infoSite3 = this.selectedData.comTaxCode + '_admin';
    }
  }

  onChange(result: Date): void {
    const tmp = result.getFullYear() + '-' + (result.getMonth()) + '-' + result.getDate();
    const toDate = moment(tmp).endOf('month').format('YYYY-MM-DDT17:00:00.000') + 'Z';

    if (result === null) {
      this.listOfData = this.listOfAllData;
    }
    else {
      this.listOfData = this.listOfAllData.filter(
        (item: Invoice) =>
          item.monthAction.toString() === toDate.toString()
      );
    }
  }

}
