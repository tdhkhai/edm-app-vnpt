import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DomainService } from 'src/app/core/services/domain.service';
import { DomainListExpiredComponent } from '../domain-list-expired/domain-list-expired.component';
import { ListDomainByStatusComponent } from '../list-domain-by-status/list-domain-by-status.component';

@Component({
  selector: 'app-overview-domain',
  templateUrl: './overview-domain.component.html',
  styleUrls: ['./overview-domain.component.scss']
})
export class OverviewDomainComponent implements OnInit {
  listOfAllData: any[] = [];
  dataLineChart: any;
  dataBarChart: any;
  dateSelected: Date;

  dataDomain: any;

  countDomain: any;
  allCusDomain = 0;
  allCusCanceledDomain = 0;

  listExpired: any;
  countExpired = 0;

  constructor(
    private domainAPI: DomainService,
    private modalService: NzModalService,
  ) {
    this.getCountDomain();
    this.getListExpired();
  }

  ngOnInit(): void {
  }

  getCountDomain() {
    this.domainAPI.GetCountDomain().subscribe((res) => {
      this.countDomain = res;
      console.log(this.countDomain);

      this.countDomain.forEach(element => {
        this.allCusDomain += element.countNew;
        this.allCusCanceledDomain += element.countCanceled;
      });
    });
  }

  getListExpired() {
    this.domainAPI.GetListExpired().subscribe((res) => {
      this.listExpired = res;
      this.countExpired = this.listExpired.length;
    });
  }

  openListExpired() {
    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG HẾT HẠN',
      nzContent: DomainListExpiredComponent,
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
      nzContent: ListDomainByStatusComponent,
      nzWidth: 1560,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }

}
