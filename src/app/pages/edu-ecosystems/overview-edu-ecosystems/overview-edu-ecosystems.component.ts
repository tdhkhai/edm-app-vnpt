import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from '../../../core/services/edu-ecosystems.service';
import { ExcelToFileService } from '../../../core/services/exceltofile.service';

@Component({
  selector: 'app-overview-edu-ecosystems',
  templateUrl: './overview-edu-ecosystems.component.html',
  styleUrls: ['./overview-edu-ecosystems.component.scss']
})
export class OverviewEduEcosystemsComponent implements OnInit {
  listOfData: any = [];
  listOfAllData: any = [];
  searchValue: string;
  loading: boolean;
  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private eduEcosystemsServices: EduEcosystemsService,
  ) { }

  ngOnInit(): void {
    this.getCountModuleByUnit();
  }

  getCountModuleByUnit() {
    this.loading = true;
    this.eduEcosystemsServices.GetCountModuleByUnit().subscribe(res => {
      this.listOfData = res;
      this.listOfAllData = res;
      this.loading = false;
    });
  }

}
