import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import * as moment from 'moment';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-data-of-sites',
  templateUrl: './data-of-sites.component.html',
  styleUrls: ['./data-of-sites.component.scss']
})
export class DataOfSitesComponent implements OnInit {
  loading: boolean;
  date = new Date();
  listOfDataAM: any = [];
  sumCountDemoInMonthbyAM = 0;
  sumCountGoliveInMonthbyAM = 0;
  sumCountGoliveInPastbyAM = 0;
  sumarySiteInMonthByAM = 0;
  listOfDataDonvi: any = [];
  sumCountDemoAccumulatedbyUnit = 0;
  sumCountGoliveAccumulatedbyUnit = 0;
  sumCountDeleteAccumulatedbyUnit = 0;
  summaryAccumulatedbyUnit = 0;
  sumCountDemoInMonthbyUnit = 0;
  sumCountGoliveInMonthbyUnit = 0;
  sumCountGoliveInPastbyUnit = 0;
  summaryInMonthbyUnit = 0;
  sumaryMonth = 0;
  constructor(
    public dialog: MatDialog,
    private invoiceAPI: InvoiceService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
    this.getData(this.date);
  }

  getData(result: Date) {
    this.loading = true;
    const lastYear = moment(result).year() - 1;
    const month = moment(result).startOf('month').toISOString();
    const eomonth = moment(result).endOf('month').toISOString();
    const payload = { month, eomonth, lastYear };

    this.invoiceAPI.CountSitebyAM(payload).subscribe(
      (data) => {
        this.listOfDataAM = data;
        this.loading = false;
        this.sumarySiteInMonthByAM = this.sumCountDemoInMonthbyAM + this.sumCountGoliveInMonthbyAM + this.sumCountGoliveInPastbyAM;
        this.sumCountDemoInMonthbyAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.countDemoInMonth, 0);
        this.sumCountGoliveInMonthbyAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.countGoliveInMonth, 0);
        this.sumCountGoliveInPastbyAM = this.listOfDataAM.reduce((sum, curr) => sum + curr.countGoliveInPast, 0);
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });

    this.invoiceAPI.CountSitebyUnit(payload).subscribe(
      (data) => {
        this.listOfDataDonvi = data;
        this.loading = false;
        this.sumCountDemoAccumulatedbyUnit = this.listOfDataDonvi.reduce((sum, curr) => sum + curr.countDemoAccumulated, 0);
        this.sumCountGoliveAccumulatedbyUnit = this.listOfDataDonvi.reduce((sum, curr) => sum + curr.countGoliveAccumulated, 0);
        this.sumCountDeleteAccumulatedbyUnit = this.listOfDataDonvi.reduce((sum, curr) => sum + curr.countDeleteAccumulated, 0);
        // tslint:disable-next-line: max-line-length
        this.summaryAccumulatedbyUnit = this.sumCountDemoAccumulatedbyUnit + this.sumCountGoliveAccumulatedbyUnit + this.sumCountDeleteAccumulatedbyUnit;
        this.sumCountDemoInMonthbyUnit = this.listOfDataDonvi.reduce((sum, curr) => sum + curr.countDemoInMonth, 0);
        this.sumCountGoliveInMonthbyUnit = this.listOfDataDonvi.reduce((sum, curr) => sum + curr.countGoliveInMonth, 0);
        this.sumCountGoliveInPastbyUnit = this.listOfDataDonvi.reduce((sum, curr) => sum + curr.countGoliveInPast, 0);

        this.sumaryMonth = this.sumCountDemoInMonthbyUnit + this.sumCountGoliveInMonthbyUnit + this.sumCountGoliveInPastbyUnit;
        // tslint:disable-next-line: max-line-length
        this.summaryInMonthbyUnit = this.sumCountDemoInMonthbyUnit + this.sumCountGoliveInMonthbyUnit;

      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
  }
}
