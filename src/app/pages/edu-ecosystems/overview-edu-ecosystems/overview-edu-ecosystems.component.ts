import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from '../../../core/services/edu-ecosystems.service';
import { ExcelToFileService } from '../../../core/services/exceltofile.service';

@Component({
  selector: 'app-overview-edu-ecosystems',
  templateUrl: './overview-edu-ecosystems.component.html',
  styleUrls: ['./overview-edu-ecosystems.component.scss']
})
export class OverviewEduEcosystemsComponent implements OnInit, AfterContentInit {
  listOfData: any = [];
  listOfAllData: any = [];
  searchValue: string;
  loading: boolean;
  sumSLL_TK = 0;
  sumSLL_Moi = 0;
  sumQoE = 0;
  sumPortal = 0;
  sumiOffice = 0;
  sumInvoice = 0;
  sumQLTT = 0;
  sumElearning = 0;
  selectedSchoolYear: any;

  listOfSchoolYear = [
    { label: "Năm học 2018 - 2019", value: "2018 - 2019" },
    { label: "Năm học 2019 - 2020", value: "2019 - 2020" },
    { label: "Năm học 2020 - 2021", value: "2020 - 2021" }
  ]

  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private eduEcosystemsServices: EduEcosystemsService,
  ) {
    this.selectedSchoolYear = this.listOfSchoolYear[this.listOfSchoolYear.length - 1];

  }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    this.selectedChange(this.selectedSchoolYear);
  }

  getCountModuleByUnit(sYear: string) {
    this.loading = true;
    this.eduEcosystemsServices.PostCountModuleByUnit({ schoolYear: sYear }).subscribe(res => {
      this.listOfData = res;
      this.listOfAllData = res;
      this.loading = false;
      this.sumSLL_TK = this.listOfData.reduce((sum, curr) => sum + curr.count_vnEdu_TK, 0);
      this.sumSLL_Moi = this.listOfData.reduce((sum, curr) => sum + curr.count_vnEdu_New, 0);
      this.sumQoE = this.listOfData.reduce((sum, curr) => sum + curr.count_vnEdu_QoE, 0);
      this.sumPortal = this.listOfData.reduce((sum, curr) => sum + curr.count_vnPortal, 0);
    });
  }

  selectedChange(e) {
    this.getCountModuleByUnit(e.value);
  }

}
