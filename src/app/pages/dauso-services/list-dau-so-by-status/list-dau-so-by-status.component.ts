import { Component, OnInit } from '@angular/core';
import { DausoService } from 'src/app/core/services/dauso.service';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';

@Component({
  selector: 'app-list-dau-so-by-status',
  templateUrl: './list-dau-so-by-status.component.html',
  styleUrls: ['./list-dau-so-by-status.component.scss']
})
export class ListDauSoByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;

  constructor(
    private excelToFile: ExcelToFileService,
    private dauSoAPI: DausoService,
  ) { }

  ngOnInit() {
    this.dauSoAPI.GetListbyStatus(this.payload).subscribe((data) => {
      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-dau-so-theo-trang-thai');
  }

}
