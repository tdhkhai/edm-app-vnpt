import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { IDCService } from 'src/app/core/services/idc.service';

@Component({
  selector: 'app-list-idc-by-status',
  templateUrl: './list-idc-by-status.component.html',
  styleUrls: ['./list-idc-by-status.component.scss']
})
export class ListIdcByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;
  constructor(
    private excelToFile: ExcelToFileService,
    private idcAPI: IDCService,
  ) { }

  ngOnInit(): void {
    this.idcAPI.GetListbyStatus(this.payload).subscribe((data) => {
      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-idc-theo-trang-thai');
  }

}
