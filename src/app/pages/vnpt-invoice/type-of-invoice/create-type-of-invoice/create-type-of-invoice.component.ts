import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-create-type-of-invoice',
  templateUrl: './create-type-of-invoice.component.html',
  styleUrls: ['./create-type-of-invoice.component.scss']
})
export class CreateTypeOfInvoiceComponent implements OnInit {

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  close() {
    this.modal.destroy();
  }

}
