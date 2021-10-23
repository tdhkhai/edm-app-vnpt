import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Datlich1080Service } from 'src/app/core/services/datlich1080.service';
import { ListDatLich1080ByStatusComponent } from '../list-dat-lich-1080-by-status/list-dat-lich-1080-by-status.component';

@Component({
  selector: 'app-overview-dat-lich',
  templateUrl: './overview-dat-lich.component.html',
  styleUrls: ['./overview-dat-lich.component.scss']
})
export class OverviewDatLichComponent implements OnInit {
  countDatLich1080: any;
  allCusDatLich1080 = 0;
  allCusCanceledDatLich1080 = 0;
  constructor(
    private datlich1080API: Datlich1080Service,
    private modalService: NzModalService,
  ) {
    this.getCountDatLich1080();
  }

  ngOnInit(): void {
  }

  getCountDatLich1080() {
    this.datlich1080API.GetCountDatlich().subscribe((res) => {
      this.countDatLich1080 = res;
      this.countDatLich1080.forEach(element => {
        this.allCusDatLich1080 += element.countNew;
        this.allCusCanceledDatLich1080 += element.countCanceled;
      });
    });
  }

  viewListByStatus(year: string, status: string) {
    const payload = {
      year,
      status
    };
    let tmp = ''
    switch (status) {
      case '1': {
        tmp = 'Đang sử dụng';
        break;
      }
      case '2': {
        tmp = 'Hủy';
        break;
      }
      default: break;
    }

    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG ' + tmp.toUpperCase() + ' TRONG NĂM ' + year,
      nzContent: ListDatLich1080ByStatusComponent,
      nzWidth: 1560,
      nzFooter: null,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }

}
