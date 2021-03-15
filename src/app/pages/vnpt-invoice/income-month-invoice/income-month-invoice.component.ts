import { Component, OnInit } from '@angular/core';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-income-invoice',
  templateUrl: './income-month-invoice.component.html',
  styleUrls: ['./income-month-invoice.component.scss']
})
export class IncomeMonthInvoiceComponent implements OnInit {
  date = new Date();

  listOfDataUnit: any = [];
  loading: boolean;
  sumCusNewUnit = 0;
  sumCusExtUnit = 0;
  sumIncomeNewUnit = 0;
  sumIncomeExtUnit = 0;
  sumCusUnit = 0;
  sumIncomeUnit = 0;

  listOfDataAM: any = [];
  sumCusNewAM = 0;
  sumCusExtAM = 0;
  sumIncomeNewAM = 0;
  sumIncomeExtAM = 0;
  sumCusAM = 0;
  sumIncomeAM = 0;


  constructor(
    private invoiceAPI: InvoiceService
    ) { }

  ngOnInit(): void {

  }

  sumaryTheoThang(result: Date) {

    this.loading = true;
    // tslint:disable-next-line: object-literal-shorthand
    const payload = { month: moment(result).month().toString(), year: moment(result).year().toString() };
    this.invoiceAPI.GetMonthlyIncome(payload).subscribe(res => {
      this.loading = false;
      this.listOfDataUnit = res;
      this.sumCusNewUnit = this.listOfDataUnit.reduce((sum, curr) => sum + curr.countNewIncome, 0);
      this.sumCusExtUnit = this.listOfDataUnit.reduce((sum, curr) => sum + curr.countExtIncome, 0);
      this.sumIncomeNewUnit = this.listOfDataUnit.reduce((sum, curr) => sum + curr.newIncome, 0);
      this.sumIncomeExtUnit = this.listOfDataUnit.reduce((sum, curr) => sum + curr.extIncome, 0);
      this.sumCusUnit = this.sumCusNewUnit + this.sumCusExtUnit;
      this.sumIncomeUnit = this.sumIncomeNewUnit + this.sumIncomeExtUnit;
    })

    this.invoiceAPI.GetMonthlyIncomebyAM(payload).subscribe(res => {
      this.loading = false;
      this.listOfDataAM = res;
      this.sumCusNewAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.countNewIncome, 0);
      this.sumCusExtAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.countExtIncome, 0);
      this.sumIncomeNewAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.newIncome, 0);
      this.sumIncomeExtAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.extIncome, 0);
      this.sumCusAM = this.sumCusNewAM + this.sumCusExtAM;
      this.sumIncomeAM = this.sumIncomeNewAM + this.sumIncomeExtAM;
    })

  }

}
