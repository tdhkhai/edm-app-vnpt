import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';

@Component({
  selector: 'app-list-modules',
  templateUrl: './list-modules.component.html',
  styleUrls: ['./list-modules.component.scss']
})
export class ListModulesComponent implements OnInit {
  selecedId: string;
  listOfData: any = [];
  loading: boolean;

  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private eduEcosystemsServices: EduEcosystemsService,
  ) { }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_module_theo_truong');
  }

}
