import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { ExtendDetailsComponent } from '../../idc-services/extend-details/extend-details.component';

@Component({
  selector: 'app-domain-list-expired',
  templateUrl: './domain-list-expired.component.html',
  styleUrls: ['./domain-list-expired.component.scss']
})
export class DomainListExpiredComponent implements OnInit {
  listExpired: any;
  loading = true;
  constructor(
    private excelToFile: ExcelToFileService,
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
