import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-income-year-invoice',
  templateUrl: './income-year-invoice.component.html',
  styleUrls: ['./income-year-invoice.component.scss']
})
export class IncomeYearInvoiceComponent implements OnInit {
  listOfData: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
