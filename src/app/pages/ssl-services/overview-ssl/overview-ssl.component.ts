import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SSLService } from 'src/app/core/services/ssl.service';
import { ListSslBySslComponent } from '../list-ssl-by-ssl/list-ssl-by-ssl.component';
import { SslListExpiredComponent } from '../ssl-list-expired/ssl-list-expired.component';

@Component({
  selector: 'app-overview-ssl',
  templateUrl: './overview-ssl.component.html',
  styleUrls: ['./overview-ssl.component.scss']
})
export class OverviewSslComponent implements OnInit {
  listOfAllData: any[] = [];
  dataLineChart: any;
  dataBarChart: any;
  dateSelected: Date;

  dataSSL: any;

  countSSL: any;
  allCusSSL = 0;
  allCusCanceledSSL = 0;

  listExpired: any;
  countExpired = 0;
  constructor(
    private sslAPI: SSLService,
    private modalService: NzModalService,
  ) {
    this.getCountSSL();
    this.getListExpired();
  }

  ngOnInit(): void {
  }

  getCountSSL() {
    this.sslAPI.GetCountSSL().subscribe((res) => {
      this.countSSL = res;
      this.countSSL.forEach(element => {
        this.allCusSSL += element.countNew;
        this.allCusCanceledSSL += element.countCanceled;
      });
    });
  }

  getListExpired() {
    this.sslAPI.GetListExpired().subscribe((res) => {
      this.listExpired = res;
      this.countExpired = this.listExpired.length;
    });
  }

  openListExpired() {
    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG HẾT HẠN',
      nzContent: SslListExpiredComponent,
      nzFooter: null,
      nzWidth: 1300,
      nzBodyStyle: {
        // height: '320px'
      },
    });
    modal.componentInstance.listExpired = this.listExpired;
    modal.afterClose.subscribe(res => {
      this.getListExpired();
    });
  }

  viewListByStatus(year: string, status: string) {
    const payload = { year, status };
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
      nzContent: ListSslBySslComponent,
      nzWidth: 1560,
      nzFooter: null,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }

}
