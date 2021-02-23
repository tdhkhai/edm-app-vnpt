import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import * as moment from 'moment';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ListInvoiceByStatusComponent } from '../list-invoice-by-status/list-invoice-by-status.component';

interface Person {
  key: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-overview-invoice',
  templateUrl: './overview-invoice.component.html',
  styleUrls: ['./overview-invoice.component.scss'],
  providers: [MessageService]
})
export class OverviewInvoiceComponent implements OnInit {

  listOfAllData: any[] = [];
  dataLineChart: any;
  dataBarChart: any;
  dateSelected: Date;

  dataInvoice: any;

  countInvoices: any;
  allCusDemoInvoice = 0;
  allCusGoliveInvoice = 0;
  allCusExtendInvoice = 0;

  constructor(
    private invoiceAPI: InvoiceService,
    private messageService: MessageService,
    private modalService: NzModalService,
  ) {
    this.dateSelected = new Date();
    this.getCountInvoice();
    this.getDataCustomersLineChart();
    this.getDataCustomersBarChart();
  }

  ngOnInit(): void {
  }

  getCountInvoice() {
    this.invoiceAPI.GetCountInvoice().subscribe((res) => {
      this.countInvoices = res;
      this.countInvoices.forEach(element => {
        this.allCusDemoInvoice += element.countDemo;
        this.allCusGoliveInvoice += element.countGolive;
        this.allCusExtendInvoice += element.countExtend;
      });
    });
  }


  getDataCustomersLineChart() {
    this.invoiceAPI.GetCountInvoiceForLineChart().subscribe(
      (data) => {
        // this.dataInvoice = data.msg;
        const tmp = data.msg;
        const arrDemo = [];
        const arrGolive = [];
        const arrExtend = [];

        tmp.forEach(element => {
          arrDemo.push(element.countDemo);
          arrGolive.push(element.countGolive);
          arrExtend.push(element.countExtend);
        });

        this.dataLineChart = {
          labels: ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10', 'T11', 'T12'],
          datasets: [
            {
              label: 'Demo',
              data: arrDemo,
              fill: false,
              borderColor: '#039eff'
            },
            {
              label: 'Chính thức',
              data: arrGolive,
              fill: false,
              borderColor: '#32a11a'
            },
            {
              label: 'Bổ sung',
              data: arrExtend,
              fill: false,
              borderColor: '#ff9203'
            }
          ]
        };


      });
  }

  getDataCustomersBarChart() {
    const pl = {
      typeOfIncomeNew: 'Mới',
      typeOfIncomeExt: 'GH',
      year: '2020'
    };
    const arrNewIncome = [];
    const arrExtendIncome = [];

    this.invoiceAPI.GetMonthlyIncome(pl).subscribe(
      (data) => {
        const tmp = data.msg;
        tmp.forEach(element => {
          if (element._id.typeOfIncome === 'Mới') {
            arrNewIncome.push(element.sum);
          } else {
            arrExtendIncome.push(element.sum);
          }
        });

        this.dataBarChart = {
          labels: ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10', 'T11', 'T12',],
          datasets: [
            {
              label: 'Doanh thu Mới',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: arrNewIncome
            },
            {
              label: 'Doanh thu Gia hạn',
              backgroundColor: '#9CCC65',
              borderColor: '#7CB342',
              data: arrExtendIncome
            }
          ]
        };
      }
    );

  }

  onChange(result: Date): void {
    const tmp = result.getFullYear() + '-' + (result.getMonth()) + '-' + result.getDate();
    const toDate = moment(tmp).endOf('month').format('YYYY-MM-DDT17:00:00.000') + 'Z';
  }

  viewListByStatus(year: string, status: string) {
    const payload = {
      year: year,
      status: status
    };

    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG ' + status.toUpperCase() + ' TRONG NĂM ' + year,
      nzContent: ListInvoiceByStatusComponent,
      nzWidth: 1560,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }
}
