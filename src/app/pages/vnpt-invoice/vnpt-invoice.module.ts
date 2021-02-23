import { NgModule } from '@angular/core';

import { AntDesignModule } from 'src/app/antDesign.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/mat.module';
import { BuildInvoiceExamplesComponent } from './build-invoice-examples/build-invoice-examples.component';
import { VNPTInvoiceRoutingModule } from './vnpt-invoice-routing.module';
import { HighlightModule } from 'ngx-highlightjs';
import { ConfigInvoiceExampleComponent } from './config-invoice-example/config-invoice-example.component';
import { StatisticalInvoiceComponent } from './statistical-invoice/statistical-invoice.component';
import { AddStatisticalInvoiceComponent } from './add-statistical-invoice/add-statistical-invoice.component';
import { IncomeMonthInvoiceComponent } from './income-month-invoice/income-month-invoice.component';
import { IncomeYearInvoiceComponent } from './income-year-invoice/income-year-invoice.component';
import { DataOfSitesComponent } from './data-of-sites/data-of-sites.component';
import { EditStaticticalInvoiceComponent } from './edit-statictical-invoice/edit-statictical-invoice.component';
import { OverviewInvoiceComponent } from './overview-invoice/overview-invoice.component';
import { PrimengModule } from 'src/app/primeng.module';
import { ChartsModule } from 'ng2-charts';
import { ListInvoiceByStatusComponent } from './list-invoice-by-status/list-invoice-by-status.component';
import { ListInvoiceByCusTaxCodeComponent } from './list-invoice-by-com-tax-code/list-invoice-by-com-tax-code';


@NgModule({
  imports: [
    CommonModule,
    AntDesignModule,
    PrimengModule,
    VNPTInvoiceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatModule,
  ],
  declarations: [
    BuildInvoiceExamplesComponent,
    ConfigInvoiceExampleComponent,
    StatisticalInvoiceComponent,
    AddStatisticalInvoiceComponent,
    IncomeMonthInvoiceComponent,
    IncomeYearInvoiceComponent,
    DataOfSitesComponent,
    EditStaticticalInvoiceComponent,
    OverviewInvoiceComponent,
    ListInvoiceByStatusComponent,
    ListInvoiceByCusTaxCodeComponent
  ],
  exports: [
    BuildInvoiceExamplesComponent,
    ConfigInvoiceExampleComponent,
    StatisticalInvoiceComponent,
    AddStatisticalInvoiceComponent,
    EditStaticticalInvoiceComponent,
    IncomeMonthInvoiceComponent,
    IncomeYearInvoiceComponent,
    DataOfSitesComponent,
    OverviewInvoiceComponent,
    ListInvoiceByStatusComponent,
    ListInvoiceByCusTaxCodeComponent
  ],
  providers: [
  ]
})
// tslint:disable-next-line: class-name
export class VNPTInvoiceModule { }
