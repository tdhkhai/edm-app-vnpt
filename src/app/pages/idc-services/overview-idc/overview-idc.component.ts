import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as moment from 'moment';
import { IDCService } from 'src/app/core/services/idc.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ListIdcByStatusComponent } from '../list-idc-by-status/list-idc-by-status.component';
import { IdcListExpiredComponent } from '../idc-list-expired/idc-list-expired.component';

@Component({
  selector: 'app-overview-idc',
  templateUrl: './overview-idc.component.html',
  styleUrls: ['./overview-idc.component.scss']
})
export class OverviewIdcComponent implements OnInit {
  listOfAllData: any[] = [];
  dataLineChart: any;
  dataBarChart: any;
  dateSelected: Date;

  dataIDC: any;

  countIDC: any;
  allCusIDC = 0;
  allCusCanceledIDC = 0;

  listExpired: any;
  countExpired = 0;

  constructor(
    private idcAPI: IDCService,
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) {
    this.dateSelected = new Date();
    this.getCountIDC();
    this.getListExpired();
    // this.getDataCustomersLineChart();
    // this.getDataCustomersBarChart();
  }

  ngOnInit(): void {
  }

  getCountIDC() {
    this.idcAPI.GetCountIDC().subscribe((res) => {
      this.countIDC = res;
      this.countIDC.forEach(element => {
        this.allCusIDC += element.countNew;
        this.allCusCanceledIDC += element.countCanceled;
      });
    });
  }


  // getDataCustomersLineChart() {
  //   this.idcAPI.GetCountInvoiceForLineChart().subscribe(
  //     (data) => {
  //       // this.dataInvoice = data.msg;
  //       const tmp = data.msg;
  //       const arrDemo = [];
  //       const arrGolive = [];
  //       const arrExtend = [];

  //       tmp.forEach(element => {
  //         arrDemo.push(element.countDemo);
  //         arrGolive.push(element.countGolive);
  //         arrExtend.push(element.countExtend);
  //       });

  //       this.dataLineChart = {
  //         labels: ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10', 'T11', 'T12'],
  //         datasets: [
  //           {
  //             label: 'Demo',
  //             data: arrDemo,
  //             fill: false,
  //             borderColor: '#039eff'
  //           },
  //           {
  //             label: 'Chính thức',
  //             data: arrGolive,
  //             fill: false,
  //             borderColor: '#32a11a'
  //           },
  //           {
  //             label: 'Bổ sung',
  //             data: arrExtend,
  //             fill: false,
  //             borderColor: '#ff9203'
  //           }
  //         ]
  //       };


  //     });
  // }

  // getDataCustomersBarChart() {
  //   const pl = {
  //     typeOfIncomeNew: 'Mới',
  //     typeOfIncomeExt: 'GH',
  //     year: '2020'
  //   };
  //   const arrNewIncome = [];
  //   const arrExtendIncome = [];

  //   this.invoiceAPI.GetMonthlyIncome(pl).subscribe(
  //     (data) => {
  //       const tmp = data.msg;
  //       tmp.forEach(element => {
  //         if (element._id.typeOfIncome === 'Mới') {
  //           arrNewIncome.push(element.sum);
  //         } else {
  //           arrExtendIncome.push(element.sum);
  //         }
  //       });

  //       this.dataBarChart = {
  //         labels: ['T01', 'T02', 'T03', 'T04', 'T05', 'T06', 'T07', 'T08', 'T09', 'T10', 'T11', 'T12',],
  //         datasets: [
  //           {
  //             label: 'Doanh thu Mới',
  //             backgroundColor: '#42A5F5',
  //             borderColor: '#1E88E5',
  //             data: arrNewIncome
  //           },
  //           {
  //             label: 'Doanh thu Gia hạn',
  //             backgroundColor: '#9CCC65',
  //             borderColor: '#7CB342',
  //             data: arrExtendIncome
  //           }
  //         ]
  //       };
  //     }
  //   );

  // }

  onChange(result: Date): void {
    const tmp = result.getFullYear() + '-' + (result.getMonth()) + '-' + result.getDate();
    const toDate = moment(tmp).endOf('month').format('YYYY-MM-DDT17:00:00.000') + 'Z';
  }

  viewListByStatus(year: string, status: string) {
    const payload = {
      year: year,
      status: status
    };
    let tmp = ''
    switch (status) {
      case '1': {
        tmp = 'Đang sử dụng';
        break;
      }
      case '2': {
        tmp = 'Gia hạn';
        break;
      }
      case '3': {
        tmp = 'Hủy';
        break;
      }
      default: break;
    }

    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG ' + tmp.toUpperCase() + ' TRONG NĂM ' + year,
      nzContent: ListIdcByStatusComponent,
      nzWidth: 1560,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }

  getListExpired() {
    this.idcAPI.GetListExpired().subscribe((res) => {
      this.listExpired = res;
      this.countExpired = this.listExpired.length;
    });
  }

  openListExpired(){
    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG HẾT HẠN',
      nzContent: IdcListExpiredComponent,
      nzWidth: 900,
      nzBodyStyle: {
        height: '320px'
      },
    });
    modal.componentInstance.listExpired = this.listExpired;
    modal.afterClose.subscribe(res => {
      this.getListExpired();
    });
  }
}
