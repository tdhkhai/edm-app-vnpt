import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { IDC } from 'src/app/core/models/IDC';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { IDCService } from 'src/app/core/services/idc.service';
import * as XLSX from 'xlsx';
import { UploadComponent } from '../../shared/upload/upload.component';
import { AddIdcComponent } from '../add-idc/add-idc.component';
import { EditIdcComponent } from '../edit-idc/edit-idc.component';
import { ExtendDetailsComponent } from '../extend-details/extend-details.component';
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
        (item: IDC) =>
          item.comName.includes(filterValue) ||
          item.am.unitCode.includes(filterValue) ||
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
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_idc');
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
      nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ HẠ TẦNG LƯU TRỮ',
      nzContent: AddIdcComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '590px'
      },
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
      nzBodyStyle: {
        height: '320px'
      },
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllIDCs();
    });
  }

  deleteExtend(id: string, data: string) {
    this.idcAPI.pullExtendIDC(id, {_id: data}).subscribe(
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
      nzBodyStyle: {
        height: '590px'
      },
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
