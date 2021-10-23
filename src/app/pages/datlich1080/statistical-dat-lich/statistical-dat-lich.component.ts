import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Datlich1080 } from 'src/app/core/models/datlich1080';
import { Datlich1080Service } from 'src/app/core/services/datlich1080.service';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import * as XLSX from 'xlsx';
import { UploadComponent } from '../../shared/upload/upload.component';
import { AddDatLichComponent } from '../add-dat-lich/add-dat-lich.component';
import { EditDatLichComponent } from '../edit-dat-lich/edit-dat-lich.component';

@Component({
  selector: 'app-statistical-dat-lich',
  templateUrl: './statistical-dat-lich.component.html',
  styleUrls: ['./statistical-dat-lich.component.scss']
})
export class StatisticalDatLichComponent implements OnInit {
  listOfData: Datlich1080[] = [];
  listOfAllData: Datlich1080[] = [];
  loading = false;
  selectedId: string;
  searchValue = '';
  visible = false;

  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private datlich1080API: Datlich1080Service,
  ) { }


  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.datlich1080API.GetAllDatlichs().subscribe(
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
        (item: Datlich1080) =>
        item.comName.includes(filterValue) ||
        item.am.unit.unitCode.includes(filterValue) ||
        item.am.userName.includes(filterValue) ||
        item.comTaxCode.includes(filterValue)
        );
    }
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_1080');
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
      nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ ĐẶT LỊCH QUA TỔNG ĐÀI 1080 MỚI',
      nzContent: AddDatLichComponent,
      nzWidth: 800,
    });

    modal.afterClose.subscribe(res => {
      this.getAll();
    });

  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA KHÁCH HÀNG ĐẶT LỊCH QUA TỔNG ĐÀI 1080',
      nzContent: EditDatLichComponent,
      nzWidth: 800,
      nzBodyStyle: {
        // height: '590px'
      },
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAll();
    });
  }

  confirmDelete(data) {
    this.datlich1080API.DeleteDatlich(data._id).subscribe((res) => {
      this.getAll();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }

}
