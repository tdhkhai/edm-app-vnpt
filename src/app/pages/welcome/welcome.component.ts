import { Component, OnInit } from '@angular/core';
import { DausoService } from 'src/app/core/services/dauso.service';
import { DomainService } from 'src/app/core/services/domain.service';
import { IDCService } from 'src/app/core/services/idc.service';
import { WebhostingService } from 'src/app/core/services/webhosting.service';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddStatisticalInvoiceComponent } from '../vnpt-invoice/add-statistical-invoice/add-statistical-invoice.component';
import { Router } from '@angular/router';
import { AddDomainComponent } from '../domain-services/add-domain/add-domain.component';
import { AddIdcComponent } from '../idc-services/add-idc/add-idc.component';
import { AddWebhostingComponent } from '../webhosting-services/add-webhosting/add-webhosting.component';
import { AddDausoComponent } from '../dauso-services/add-dauso/add-dauso.component';

@Component({
  selector: 'app-welcome-v2',
  templateUrl: './welcome-v2.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: []
})
export class WelcomeComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center'
  };
  countDauso: any;
  allCusActivedDauso = 0;
  allCusCanceledDauso = 0;

  countDomain: any;
  allCusActivedDomain = 0;
  allCusCanceledDomain = 0;

  countIDC: any;
  allCusIDC = 0;
  allCusCanceledIDC = 0;

  countWebhosting: any;
  allCusActivedWebhosting = 0;
  allCusCanceledWebhosting = 0;

  countInvoices: any;
  allCusDemoInvoice = 0;
  allCusGoliveInvoice = 0;
  allCusExtendInvoice = 0;
  data: any;
  constructor(
    private dausoAPI: DausoService,
    private idcAPI: IDCService,
    private domainAPI: DomainService,
    private webhostingAPI: WebhostingService,
    private invoiceAPI: InvoiceService,
    private modalService: NzModalService,
    private router: Router
  ) {

    this.getCountDauso();
    this.getCountDomain();
    this.getCountIDC();
    this.getCountWebhosting();
    this.getCountInvoice();
  }

  ngOnInit() {
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

  getCountDauso() {
    this.dausoAPI.GetCountDauso().subscribe((res) => {
      this.countDauso = res;
      this.countDauso.forEach(element => {
        this.allCusActivedDauso += element.countActived;
        this.allCusCanceledDauso += element.countCanceled;
      });
    });
  }

  getCountDomain() {
    this.domainAPI.GetCountDomain().subscribe((res) => {
      this.countDomain = res;
      this.countDomain.forEach(element => {
        this.allCusActivedDomain += element.countActived;
        this.allCusCanceledDomain += element.countCanceled;
      });
    });
  }

  getCountIDC() {
    this.idcAPI.GetCountIDC().subscribe((res) => {
      this.countIDC = res;
      this.countIDC.forEach(element => {
        this.allCusIDC += element.countAll;
        this.allCusCanceledIDC += element.countCanceled;
      });
    });
  }

  getCountWebhosting() {
    this.webhostingAPI.GetCountWebhosting().subscribe((res) => {
      this.countWebhosting = res;
      this.countWebhosting.forEach(element => {
        this.allCusActivedWebhosting += element.countActived;
        this.allCusCanceledWebhosting += element.countCanceled;
      });
    });
  }

  showAddAction(service: string) {
    switch (service) {
      case 'invoice': {
        const modal = this.modalService.create({
          nzTitle: 'KHÁCH HÀNG HÓA ĐƠN ĐIỆN TỬ MỚI',
          nzContent: AddStatisticalInvoiceComponent,
          nzWidth: 800,
          nzBodyStyle: {
            height: '640px'
          },
        });

        modal.afterClose.subscribe(res => {
          this.router.navigateByUrl('/vnpt-invoice/tong-quan-hddt');
        });
        break;
      }
      case 'domain': {
        const modal = this.modalService.create({
          nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ TÊN MIỀN',
          nzContent: AddDomainComponent,
          nzWidth: 800,
          nzBodyStyle: {
            height: '590px'
          },
        });

        modal.afterClose.subscribe(res => {
          this.router.navigateByUrl('/domain/tong-quan-domain');
        });
        break;
      }

      case 'idc': {
        const modal = this.modalService.create({
          nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ HẠ TẦNG LƯU TRỮ',
          nzContent: AddIdcComponent,
          nzWidth: 800,
          nzBodyStyle: {
            height: '590px'
          },
        });

        modal.afterClose.subscribe(res => {
          this.router.navigateByUrl('/idc/tong-quan-idc');
        });
        break;
      }

      case 'webhosting': {
        const modal = this.modalService.create({
          nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ DỊCH VỤ WEBHOSTING',
          nzContent: AddWebhostingComponent,
          nzWidth: 800,
          nzBodyStyle: {
            height: '590px'
          },
        });

        modal.afterClose.subscribe(res => {
          this.router.navigateByUrl('/webhosting/tong-quan-webhosting');
        });
        break;
      }

      case 'dauso': {
        const modal = this.modalService.create({
          nzTitle: 'KHÁCH HÀNG ĐĂNG KÝ ĐẦU SỐ 1800 - 1900 MỚI',
          nzContent: AddDausoComponent,
          nzWidth: 800,
          nzBodyStyle: {
            height: '590px'
          },
        });

        modal.afterClose.subscribe(res => {
          this.router.navigateByUrl('/dau-so/tong-quan-dau-so');
        });
        break;
      }
      default: break;
    }
  }

  showViewDetailAction(service: string) {
    switch (service) {
      case 'invoice': {
        this.router.navigateByUrl('/vnpt-invoice/chi-tiet-hddt');
        break;
      }
      case 'domain': {
        this.router.navigateByUrl('/domain/so-lieu-domain');
        break;
      }

      case 'idc': {
        this.router.navigateByUrl('/idc/so-lieu-idc');
        break;
      }

      case 'webhosting': {
        this.router.navigateByUrl('/webhosting/so-lieu-webhosting');
        break;
      }

      case 'dauso': {
        this.router.navigateByUrl('/dau-so/so-lieu-dau-so');
        break;
      }
      default: break;
    }
  }

  showOverviewAction(service: string) {
    switch (service) {
      case 'invoice': {
        this.router.navigateByUrl('/vnpt-invoice/tong-quan-hddt');
        break;
      }
      case 'domain': {
        this.router.navigateByUrl('/domain/tong-quan-domain');
        break;
      }

      case 'idc': {
        this.router.navigateByUrl('/idc/tong-quan-idc');
        break;
      }

      case 'webhosting': {
        this.router.navigateByUrl('/webhosting/tong-quan-webhosting');
        break;
      }

      case 'dauso': {
        this.router.navigateByUrl('/dau-so/tong-quan-dau-so');
        break;
      }
      default: break;
    }
  }

}
