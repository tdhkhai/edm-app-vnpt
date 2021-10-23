import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { SSLService } from 'src/app/core/services/ssl.service';

@Component({
  selector: 'app-list-ssl-by-ssl',
  templateUrl: './list-ssl-by-ssl.component.html',
  styleUrls: ['./list-ssl-by-ssl.component.scss']
})
export class ListSslBySslComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;
  constructor(
    private excelToFile: ExcelToFileService,
    private sslAPI: SSLService,
  ) { }

  ngOnInit(): void {
    this.sslAPI.GetListbyStatus(this.payload).subscribe((data) => {
      console.log(this.payload);

      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-ssl-theo-trang-thai');
  }

}
