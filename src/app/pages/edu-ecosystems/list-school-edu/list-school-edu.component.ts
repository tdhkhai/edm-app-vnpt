import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, OnChanges } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExcelToFileService } from '../../../core/services/exceltofile.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { UploadComponent } from '../../shared/upload/upload.component';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { EduEcosystemsService } from '../../../core/services/edu-ecosystems.service';
import { School } from '../../../core/models/school';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { RegisEduModuleComponent } from '../regis-edu-module/regis-edu-module.component';
import { ListModulesComponent } from '../module-by-school/list-modules/list-modules.component';
import { UnitService } from '../../../../app/core/services/unit.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-school-edu',
  templateUrl: './list-school-edu.component.html',
  styleUrls: ['./list-school-edu.component.scss']
})
export class ListSchoolEduComponent implements OnInit {
  listOfData: any = [];
  listOfAllData: any = [];
  loading: boolean;
  filterSchoolName = new FormControl('');
  filterSchoolTaxCode = new FormControl('');
  tmp: any;
  filteredData: any[] = [];

  constructor(
    private ref: ChangeDetectorRef,
    private unitAPI: UnitService,
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private eduEcosystemsServices: EduEcosystemsService,
  ) { }

  ngOnInit(): void {
    this.getSchools();
  }
  getSchools() {
    this.loading = true;
    // this.eduEcosystemsServices.GetAllSchools().subscribe(res => {
    this.eduEcosystemsServices.GetListModuleUsedbySchool().subscribe(res => {
      this.listOfData = res;
      this.listOfAllData = res;
      // this.filteredData = this.filteredData.length > 0 ? this.filteredData : this.listOfData;
      this.loading = false;

      this.listOfData.forEach(element => {
        if ('modules' in element._id === true) {
          if (element._id.modules !== null || element._id.modules !== []) {
            element._id.modules = element._id.modules.reduce((accumalator, current) => {
              if (!accumalator.some(item => item === current)) {
                accumalator.push(current);
              }
              return accumalator;
            }, []);
          }
        }
      });
    });

  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value.toLowerCase();

  //   if (filterValue === '') {
  //     this.listOfData = this.listOfAllData;
  //   }
  //   else {
  //     this.listOfData = this.listOfAllData.filter(
  //       (item: School) =>
  //         item.schoolName.includes(filterValue) ||
  //         item.schoolTaxCode.includes(filterValue)
  //       // item.userName.includes(filterValue)
  //     );
  //   }
  // }

  openAddModule(id: string) {
    const modal = this.modalService.create({
      nzTitle: 'ĐĂNG KÝ MODULE',
      nzContent: RegisEduModuleComponent,
      nzFooter: null,
      nzWidth: 800,
    });

    modal.componentInstance.selecedId = id;
    modal.afterClose.subscribe(result => this.getSchools());
  }

  openListModulebySchool(id: string) {
    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH MODULE TRƯỜNG ĐANG SỬ DỤNG',
      nzContent: ListModulesComponent,
      nzWidth: 800,
      // nzBodyStyle: {
      //   height: '370px'
      // },
    });

    modal.componentInstance.selectedId = id;
    modal.afterClose.subscribe(result => this.getSchools());
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_hst_vnEdu');
  }

  importExcel() {
    const modal = this.modalService.create({
      nzTitle: 'Import dữ liệu',
      nzContent: UploadComponent,
      nzWidth: 400,
    });

    modal.afterClose.subscribe(result => {
      this.handleImport(result);
    });

  }

  handleImport(file: File): any {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary', cellDates: true, dateNF: 'mm/dd/yyyy' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      // tslint:disable-next-line: max-line-length
      const data = XLSX.utils.sheet_to_json(ws, { raw: false });
      // to get 2d array pass 2nd parameter as object {header: 1}
      // console.log(data); // Data will be logged in array format containing objects
      // console.log(typeof(data));
      this.importDataImport(data);
    };
  }

  importDataImport(data: any) {
    data.forEach(element => {

      this.unitAPI.GetUnitbyUnitCode({ unitCode: element.unitCode }).subscribe(res => {
        element.unit = res[0];
      });

      delete element.unitCode;
      element.schoolName = element.schoolName.toUpperCase();

      setTimeout(() => {
        // console.log(element);
        this.eduEcosystemsServices.AddSchool(element).subscribe(res => {
          // this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
        }, (error) => {
          console.log(error);
          // this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
        });
      }, 1000);
    });
    this.getSchools();
  }

  showCreate() {
    const modal = this.modalService.create({
      nzTitle: 'THÊM TRƯỜNG MỚI',
      nzContent: AddSchoolComponent,
      nzWidth: 800,
      // nzBodyStyle: {
      //   height: '420px'
      // },
    });

    modal.afterClose.subscribe(res => {
      this.getSchools();
    });
  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA THÔNG TIN TRƯỜNG',
      nzContent: EditSchoolComponent,
      nzWidth: 800,
      // nzBodyStyle: {
      //   height: '420px'
      // },
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getSchools();
    });
  }

  confirmDelete(data) {
    this.eduEcosystemsServices.DeleteSchool(data._id.idSchool).subscribe((res) => {
      this.getSchools();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }
}
