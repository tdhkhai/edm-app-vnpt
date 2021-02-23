import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ChartModule } from 'primeng/chart';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    TableModule,
    PaginatorModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    ChartModule,
    ToastModule,
  ],
  exports: [
    TableModule,
    ButtonModule,
    PaginatorModule,
    MessagesModule,
    MessageModule,
    ChartModule,
    ToastModule,
  ]
})
export class PrimengModule { }
