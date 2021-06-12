import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { ExtendDetailsDomainComponent } from '../extend-details-domain/extend-details-domain.component';

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
    private modal: NzModalRef
  ) { }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listExpired, 'danh-sach-idc-het-han');
  }

  openExtendDetails(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'THÔNG TIN GIA HẠN DỊCH VỤ',
      nzContent: ExtendDetailsDomainComponent,
      nzWidth: 800,
    });
    modal.componentInstance.selectedId = selectedId;
  }

  close() {
    this.modal.close();
  }

}
