import { Component, OnInit } from '@angular/core';
import { DomainService } from 'src/app/core/services/domain.service';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';

@Component({
  selector: 'app-list-domain-by-status',
  templateUrl: './list-domain-by-status.component.html',
  styleUrls: ['./list-domain-by-status.component.scss']
})
export class ListDomainByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;
  constructor(
    private excelToFile: ExcelToFileService,
    private domainAPI: DomainService,
  ) { }

  ngOnInit(): void {
    this.domainAPI.GetListbyStatus(this.payload).subscribe((data) => {
      console.log(this.payload);

      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-domain-theo-trang-thai');
  }

}
