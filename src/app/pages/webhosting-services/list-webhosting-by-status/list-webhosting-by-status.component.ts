import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { WebhostingService } from 'src/app/core/services/webhosting.service';

@Component({
  selector: 'app-list-webhosting-by-status',
  templateUrl: './list-webhosting-by-status.component.html',
  styleUrls: ['./list-webhosting-by-status.component.scss']
})
export class ListWebhostingByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;
  constructor(
    private excelToFile: ExcelToFileService,
    private webhostingAPI: WebhostingService,
  ) { }

  ngOnInit(): void {
    this.webhostingAPI.GetListbyStatus(this.payload).subscribe((data) => {
      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-webhosting-theo-trang-thai');
  }

}
