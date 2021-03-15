import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-income-year-invoice',
  templateUrl: './income-year-invoice.component.html',
  styleUrls: ['./income-year-invoice.component.scss']
})
export class IncomeYearInvoiceComponent implements OnInit {
  listOfDataUnit: any = [];
  date = new Date();
  loading: boolean;
  unitArr = [
    { "id": "APU" },
    { "id": "CDC" },
    { "id": "CMI" },
    { "id": "CPU" },
    { "id": "CTH" },
    { "id": "PTN" },
    { "id": "TBN" },
    { "id": "TCDN" },
    { "id": "TSN" },
    { "id": "TTN" },
  ]

  constructor(
    private invoiceAPI: InvoiceService
  ) { }

  ngOnInit(): void {
    console.log(this.unitArr);

  }

  sumaryTheoThang(result: Date) {

    this.loading = true;
    // tslint:disable-next-line: object-literal-shorthand
    const payload = { year: moment(result).year().toString() };
    this.invoiceAPI.GetIncomeByYear(payload).subscribe(res => {
      this.loading = false;
      this.listOfDataUnit = res;
    })

  }

}
