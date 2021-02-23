import { Component, OnInit } from '@angular/core';
import { DausoService } from 'src/app/core/services/dauso.service';
import { DomainService } from 'src/app/core/services/domain.service';
import { IDCService } from 'src/app/core/services/idc.service';
import { WebhostingService } from 'src/app/core/services/webhosting.service';
import { MessageService } from 'primeng/api';
import { InvoiceService } from 'src/app/core/services/invoice.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  providers: [MessageService]
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
    private messageService: MessageService
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

}
