import { Component, OnInit } from '@angular/core';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-list-invoice-by-com-tax-code',
  templateUrl: './list-invoice-by-com-tax-code.html',
  styleUrls: ['./list-invoice-by-com-tax-code.scss']
})
export class ListInvoiceByCusTaxCodeComponent implements OnInit {
  loading = true;
  listOfData: any;
  selectedComTaxCode: string;
  sumIncome = 0;
  constructor(
    private invoiceAPI: InvoiceService,
    private excelToFile: ExcelToFileService
  ) {
  }

  ngOnInit(): void {
    if (this.listOfData !== '' || this.listOfData != null) {
      this.listOfData.forEach(element => {
        if (element.incomeDate !== '' || element.incomeDate != null) {
          this.sumIncome += element.income;
        }
      });
    }
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-hddt-theo-mst');
  }

}
