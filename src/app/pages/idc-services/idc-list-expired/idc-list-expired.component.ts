import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { IDCService } from 'src/app/core/services/idc.service';
import { ExtendDetailsComponent } from '../extend-details/extend-details.component';

@Component({
  selector: 'app-idc-list-expired',
  templateUrl: './idc-list-expired.component.html',
  styleUrls: ['./idc-list-expired.component.scss']
})
export class IdcListExpiredComponent implements OnInit {
  listExpired: any;
  loading = true;
  constructor(
    private excelToFile: ExcelToFileService,
    private idcAPI: IDCService,
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listExpired, 'danh-sach-idc-het-han');
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
  }

}
