import { Component, OnInit } from '@angular/core';
import { Datlich1080Service } from 'src/app/core/services/datlich1080.service';
import { DausoService } from 'src/app/core/services/dauso.service';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';

@Component({
  selector: 'app-list-dat-lich-1080-by-status',
  templateUrl: './list-dat-lich-1080-by-status.component.html',
  styleUrls: ['./list-dat-lich-1080-by-status.component.scss']
})
export class ListDatLich1080ByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;

  constructor(
    private excelToFile: ExcelToFileService,
    private datlich1080API: Datlich1080Service,
  ) { }

  ngOnInit() {
    this.datlich1080API.GetListbyStatus(this.payload).subscribe((data) => {
      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-dat-lich-1080-theo-trang-thai');
  }

}
