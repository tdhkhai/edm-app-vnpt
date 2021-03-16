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
  listOfData: any = [];
  selectedComTaxCode: any;
  sumIncome = 0;
  constructor(
    private invoiceAPI: InvoiceService,
    private excelToFile: ExcelToFileService
  ) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.invoiceAPI.GetListInvoiceByComTaxCode({ selectedComTaxCode: this.selectedComTaxCode }).subscribe((data) => {
      this.loading = false;
      this.listOfData = data;
      this.sumIncome = this.listOfData.reduce((sum, curr) => sum + curr.income, 0);
      console.log(this.sumIncome);

    })
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh-sach-hddt-theo-mst');
  }

}
