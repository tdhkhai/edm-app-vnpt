import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { DausoService } from 'src/app/core/services/dauso.service';
import { ListDauSoByStatusComponent } from '../list-dau-so-by-status/list-dau-so-by-status.component';

@Component({
  selector: 'app-overview-dauso',
  templateUrl: './overview-dauso.component.html',
  styleUrls: ['./overview-dauso.component.scss']
})
export class OverviewDausoComponent implements OnInit {
  countDauSo: any;
  allCusDauSo = 0;
  allCusCanceledDauSo = 0;
  constructor(
    private dauSoAPI: DausoService,
    private modalService: NzModalService,
  ) {
    this.getCountDauSo();
   }

  ngOnInit(): void {
  }

  getCountDauSo() {
    this.dauSoAPI.GetCountDauso().subscribe((res) => {
      this.countDauSo = res;
      this.countDauSo.forEach(element => {
        this.allCusDauSo += element.countNew;
        this.allCusCanceledDauSo += element.countCanceled;
      });
    });
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
        tmp = 'Hủy';
        break;
      }
      default: break;
    }

    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH KHÁCH HÀNG ' + tmp.toUpperCase() + ' TRONG NĂM ' + year,
      nzContent: ListDauSoByStatusComponent,
      nzWidth: 1560,
      nzBodyStyle: {
        // height: '550px'
      },
    });

    modal.componentInstance.payload = payload;

  }

}
