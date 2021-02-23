import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import * as moment from 'moment';

@Component({
  selector: 'app-income-invoice',
  templateUrl: './income-month-invoice.component.html',
  styleUrls: ['./income-month-invoice.component.scss']
})
export class IncomeMonthInvoiceComponent implements OnInit {
  date = new Date();
  listDTMoiAM: any = [];
  listDTGHAM: any = [];
  listDTMoi: any = [];
  listDTGH: any = [];
  loading: boolean;
  sumSLKHMoi = 0;
  sumDTMoi = 0;
  sumSLKHGH = 0;
  sumDTGH = 0;

  sumSLKHMoiAM = 0;
  sumDTMoiAM = 0;
  sumSLKHGHAM = 0;
  sumDTGHAM = 0;

  constructor(
    public dialog: MatDialog,
    private invoiceAPI: InvoiceService,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
  }

  sumaryTheoThang(result: Date) {
    this.loading = true;
    const month = moment(result).startOf('month').toISOString();
    // tslint:disable-next-line: object-literal-shorthand
    const payload1 = { month: month, toi: 'Mới' };
    // tslint:disable-next-line: object-literal-shorthand
    const payload2 = { month: month, toi: 'GH' };

    this.invoiceAPI.sumaryTheoThang(payload1).subscribe(
      (data) => {
        this.listDTMoi = data;
        this.sumSLKHMoi = this.listDTMoi.msg.reduce((sum, curr) => sum + curr.count, 0);
        this.sumDTMoi = this.listDTMoi.msg.reduce((sum, curr) => sum + curr.totalIncome, 0);
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });

    this.invoiceAPI.sumaryTheoThang(payload2).subscribe(
      (data) => {
        this.listDTGH = data;
        this.sumSLKHGH = this.listDTGH.msg.reduce((sum, curr) => sum + curr.count, 0);
        this.sumDTGH = this.listDTGH.msg.reduce((sum, curr) => sum + curr.totalIncome, 0);
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });

    this.invoiceAPI.sumaryTheoThangAM(payload1).subscribe(
      (data) => {
        this.listDTMoiAM = data;
        this.sumSLKHMoiAM = this.listDTMoiAM.msg.reduce((sum, curr) => sum + curr.count, 0);
        this.sumDTMoiAM = this.listDTMoiAM.msg.reduce((sum, curr) => sum + curr.totalIncome, 0);
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });

    this.invoiceAPI.sumaryTheoThangAM(payload2).subscribe(
      (data) => {
        this.listDTGHAM = data;
        this.sumSLKHGHAM = this.listDTGHAM.msg.reduce((sum, curr) => sum + curr.count, 0);
        this.sumDTGHAM = this.listDTGHAM.msg.reduce((sum, curr) => sum + curr.totalIncome, 0);
        this.loading = false;
      }, (error) => {
        console.log(error);
        this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
      });
  }

}
