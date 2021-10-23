import { Component, OnInit } from '@angular/core';
import { NzModalService, NzModalRef } from 'ng-zorro-antd/modal';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { ExtendDetailsSslComponent } from '../extend-details-ssl/extend-details-ssl.component';

@Component({
  selector: 'app-ssl-list-expired',
  templateUrl: './ssl-list-expired.component.html',
  styleUrls: ['./ssl-list-expired.component.scss']
})
export class SslListExpiredComponent implements OnInit {
  listExpired: any;
  loading = true;
  constructor(
    private excelToFile: ExcelToFileService,
    private modalService: NzModalService,
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listExpired, 'danh-sach-ssl-het-han');
  }

  openExtendDetails(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'THÔNG TIN GIA HẠN DỊCH VỤ',
      nzContent: ExtendDetailsSslComponent,
      nzWidth: 800,
    });
    modal.componentInstance.selectedId = selectedId;
  }

  close() {
    this.modal.close();
  }

}
