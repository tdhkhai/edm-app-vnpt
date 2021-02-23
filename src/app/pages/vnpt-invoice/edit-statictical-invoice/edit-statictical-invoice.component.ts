import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Invoice } from 'src/app/core/models/vnpt-invoice';
import { InvoiceService } from 'src/app/core/services/invoice.service';
import { UnitService } from 'src/app/core/services/unit.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-edit-statictical-invoice',
  templateUrl: './edit-statictical-invoice.component.html',
  styleUrls: ['./edit-statictical-invoice.component.scss']
})
export class EditStaticticalInvoiceComponent implements OnInit {
  listOfUnit: any = [];
  listOfUser: any = [];
  listOfStatus = [
    {
      status: 'Pending'
    },
    {
      status: 'Demo'
    },
    {
      status: 'Golive'
    },
    {
      status: 'Extend'
    },
    {
      status: 'Delete'
    },
  ];

  invoiceForm: FormGroup;
  monthAction: Date;
  dateAction: Date;
  dateDemo: Date;
  dateGolive: Date;
  dateExtend: Date;
  dateDelete: Date;
  isPending = true;
  isDemo = true;
  isGolive = true;
  isExtend = true;
  isDelete = true;

  selectedData: Invoice;
  selectedId: string;
  amountTemp = 0;
  isSpinning = false;

  am: any;
  constructor(
    private unitAPI: UnitService,
    private userAPI: UserService,
    private invoiceAPI: InvoiceService,
    private notification: NzNotificationService,
    private modal: NzModalRef
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.invoiceAPI.GetInvoice(this.selectedId).subscribe(data => {
        this.isSpinning = false;
        this.invoiceForm = new FormGroup({
          monthAction: new FormControl(data.monthAction),
          dateDemo: new FormControl(data.dateDemo),
          dateGolive: new FormControl(data.dateGolive),
          dateExtend: new FormControl(data.dateExtend),
          dateDelete: new FormControl(data.dateDelete),
          status: new FormControl(data.status),
          am: new FormControl(data.am),
          comTaxCode: new FormControl(data.comTaxCode),
          comName: new FormControl(data.comName),
          amount: new FormControl(data.amount),
          income: new FormControl(data.income),
          incomeDate: new FormControl(data.incomeDate)
        });
      });
    }, 2000);
  }

  ngOnInit(): void {
    this.setForm();
    this.getAllUnits();
    this.getAllUsersActivated();
  }

  setForm() {
    this.invoiceForm = new FormGroup({
      monthAction: new FormControl(Date()),
      dateDemo: new FormControl(Date()),
      dateGolive: new FormControl(Date()),
      dateExtend: new FormControl(Date()),
      dateDelete: new FormControl(Date()),
      status: new FormControl(),
      am: new FormControl(),
      comTaxCode: new FormControl(),
      comName: new FormControl(),
      amount: new FormControl(),
      income: new FormControl(),
      incomeDate: new FormControl()
    });
  }

  getAllUnits() {
    this.unitAPI.GetUnitsActivated().subscribe(
      (data) => {
        this.listOfUnit = data;
        // console.log(this.listOfUnit);

      }
    );
  }

  getAllUsersActivated() {
    this.userAPI.GetUsersActivated().subscribe(
      (data) => {
        this.listOfUser = data;
        // console.log(this.listOfUser);
      }
    );
  }

  selectStatusChange(result) {
    if (result === 'Demo') {
      this.isDemo = false;
      this.isGolive = true;
      this.isExtend = true;
      this.isDelete = true;
    } else if (result === 'Golive') {
      this.isDemo = true;
      this.isExtend = true;
      this.isDelete = true;
      this.isGolive = false;
    } else if (result === 'Extend') {
      this.isDemo = true;
      this.isGolive = true;
      this.isDelete = true;
      this.isExtend = false;
    } else if (result === 'Delete') {
      this.isDemo = true;
      this.isGolive = true;
      this.isExtend = true;
      this.isDelete = false;
    } else {
      this.isDemo = true;
      this.isGolive = true;
      this.isExtend = true;
      this.isDelete = true;
    }
  }

  compareByOptionId(c1, c2) {
    return c1 && c2 ? c1._id === c2._id : c1 === c2;
  }

  close() {
    this.modal.destroy();
  }

  submitInvoiceForm() {

    // tslint:disable-next-line: no-conditional-assignment
    if (this.invoiceForm.value.amount = 300) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 1000;
      // tslint:disable-next-line: no-conditional-assignment
    } else if (this.invoiceForm.value.amount = 500) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 840;
      // tslint:disable-next-line: no-conditional-assignment
    } else if (this.invoiceForm.value.amount = 1000) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 670;
      // tslint:disable-next-line: no-conditional-assignment
    } else if (this.invoiceForm.value.amount = 2000) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 500;
      // tslint:disable-next-line: no-conditional-assignment
    } else if (this.invoiceForm.value.amount = 3000) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 500;
      // tslint:disable-next-line: no-conditional-assignment
    } else if (this.invoiceForm.value.amount = 5000) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 430;
      // tslint:disable-next-line: no-conditional-assignment
    } else if (this.invoiceForm.value.amount = 10000) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 360;
    } else if (this.invoiceForm.value.amount >= 11000) {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 300;
    } else {
      this.invoiceForm.value.income = this.invoiceForm.value.amount * 300;
    }

    this.invoiceAPI.UpdateInvoice(this.invoiceForm.value, this.selectedId).subscribe(res => {
      this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
      this.modal.destroy();
    }, err => {
      console.log(err);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });

  }

}
