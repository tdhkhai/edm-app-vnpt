import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-list-invoice-by-status',
  templateUrl: './list-invoice-by-status.component.html',
  styleUrls: ['./list-invoice-by-status.component.scss']
})
export class ListInvoiceByStatusComponent implements OnInit {
  yearSelected: string;
  statusSelected: string;
  listOfData: any = [];
  loading = true;
  payload: any;
  constructor(
    private excelToFile: ExcelToFileService,
    private invoiceAPI: InvoiceService,
  ) {

  }

  ngOnInit(): void {
    this.invoiceAPI.GetListInvoicebyStatus(this.payload).subscribe((data) => {
      this.listOfData = data;
      this.loading = false;
    });
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-hddt-theo-trang-thai');
  }
}
