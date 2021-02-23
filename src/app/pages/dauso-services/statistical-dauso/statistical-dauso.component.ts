import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import * as XLSX from 'xlsx';
import { AddDausoComponent } from '../add-dauso/add-dauso.component';
import { DausoService } from 'src/app/core/services/dauso.service';
import { EditDausoComponent } from '../edit-dauso/edit-dauso.component';
import { Dauso } from 'src/app/core/models/dauso';
import { UploadComponent } from '../../shared/upload/upload.component';

@Component({
  selector: 'app-statistical-dauso',
  templateUrl: './statistical-dauso.component.html',
  styleUrls: ['./statistical-dauso.component.scss']
})
export class StatisticalDausoComponent implements OnInit {
  listOfData: Dauso[] = [];
  listOfAllData: Dauso[] = [];
  loading = false;
  selectedId: string;
  searchValue = '';
  visible = false;

  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private dausoAPI: DausoService,

  ) { }

  ngOnInit(): void {
    this.getAllDausos();
  }

  getAllDausos() {
    this.loading = true;
    this.dausoAPI.GetAllDausos().subscribe(
      (data) => {
        this.listOfData = data;
        this.listOfAllData = data;
        this.loading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    // let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.listOfData = this.listOfAllData;
    }
    else {
      this.listOfData = this.listOfAllData.filter(
        (item: Dauso) =>
        item.comName.includes(filterValue) ||
        item.am.unitCode.includes(filterValue) ||
        item.am.userName.includes(filterValue) ||
        item.comTaxCode.includes(filterValue) ||
        item.dauso.includes(filterValue)
        );
    }
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_1800_1900');
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
      nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ ĐẦU SỐ 1800 - 1900 MỚI',
      nzContent: AddDausoComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '590px'
      },
    });

    modal.afterClose.subscribe(res => {
      this.getAllDausos();
    });

  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA KHÁCH HÀNG ĐĂNG KÝ ĐẦU SỐ 1800 - 1900',
      nzContent: EditDausoComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '590px'
      },
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllDausos();
    });
  }

  confirmDelete(data) {
    this.dausoAPI.DeleteDauso(data._id).subscribe((res) => {
      this.getAllDausos();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }

}
