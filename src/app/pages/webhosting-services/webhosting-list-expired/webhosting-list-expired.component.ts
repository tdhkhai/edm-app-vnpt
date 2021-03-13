import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { ExtendDetailsWebhostingComponent } from '../extend-details-webhosting/extend-details-webhosting.component';

@Component({
  selector: 'app-webhosting-list-expired',
  templateUrl: './webhosting-list-expired.component.html',
  styleUrls: ['./webhosting-list-expired.component.scss']
})
export class WebhostingListExpiredComponent implements OnInit {
  listExpired: any;
  loading = true;
  constructor(
    private excelToFile: ExcelToFileService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listExpired, 'danh-sach-webhosting-het-han');
  }

  openExtendDetails(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'THÔNG TIN GIA HẠN DỊCH VỤ',
      nzContent: ExtendDetailsWebhostingComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '320px'
      },
    });
    modal.componentInstance.selectedId = selectedId;
  }

}
