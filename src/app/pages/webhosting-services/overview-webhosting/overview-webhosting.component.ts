import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WebhostingService } from 'src/app/core/services/webhosting.service';
import { ListWebhostingByStatusComponent } from '../list-webhosting-by-status/list-webhosting-by-status.component';
import { WebhostingListExpiredComponent } from '../webhosting-list-expired/webhosting-list-expired.component';

@Component({
  selector: 'app-overview-webhosting',
  templateUrl: './overview-webhosting.component.html',
  styleUrls: ['./overview-webhosting.component.scss']
})
export class OverviewWebhostingComponent implements OnInit {
  listOfAllData: any[] = [];
  dataLineChart: any;
  dataBarChart: any;
  dateSelected: Date;

  dataWebhosting: any;

  countWebhosting: any;
  allCusWebhosting = 0;
  allCusCanceledWebhosting = 0;

  listExpired: any;
  countExpired = 0;

  constructor(
    private webhostingAPI: WebhostingService,
    private modalService: NzModalService,
  ) {
    this.dateSelected = new Date();
    this.getCountWebhosting();
    this.getListExpired();
  }

  ngOnInit(): void {
  }

  getCountWebhosting() {
    this.webhostingAPI.GetCountWebhosting().subscribe((res) => {
      this.countWebhosting = res;
      this.countWebhosting.forEach(element => {
        this.allCusWebhosting += element.countNew;
        this.allCusCanceledWebhosting += element.countCanceled;
      });
    });
  }

  // onChange(result: Date): void {
  //   const tmp = result.getFullYear() + '-' + (result.getMonth()) + '-' + result.getDate();
  //   const toDate = moment(tmp).endOf('month').format('YYYY-MM-DDT17:00:00.000') + 'Z';
  // }

  viewListByStatus(year: string, status: string) {
    const payload = { year, status };
    let tmp = '';
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
      nzContent: ListWebhostingByStatusComponent,
      nzWidth: 1560,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }

  getListExpired() {
    this.webhostingAPI.GetListExpired().subscribe((res) => {
      this.listExpired = res;
      this.countExpired = this.listExpired.length;
    });
  }

  openListExpired() {
    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG HẾT HẠN',
      nzContent: WebhostingListExpiredComponent,
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
