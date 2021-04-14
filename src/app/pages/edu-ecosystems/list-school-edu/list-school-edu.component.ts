import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { UploadComponent } from '../../shared/upload/upload.component';
import { AddSchoolComponent } from '../add-school/add-school.component';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';
import { School } from 'src/app/core/models/school';
import { EditSchoolComponent } from '../edit-school/edit-school.component';
import { RegisEduModuleComponent } from '../regis-edu-module/regis-edu-module.component';
import { ListModulesComponent } from '../module-by-school/list-modules/list-modules.component';

@Component({
  selector: 'app-list-school-edu',
  templateUrl: './list-school-edu.component.html',
  styleUrls: ['./list-school-edu.component.scss']
})
export class ListSchoolEduComponent implements OnInit {
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
    this.getSchool();
  }

  getSchool() {
    this.loading = true;
    // this.eduEcosystemsServices.GetAllSchools().subscribe(res => {
    this.eduEcosystemsServices.GetListModuleUsedbySchool().subscribe(res => {
      this.listOfData = res;
      this.listOfAllData = res;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    // let filterValueLower = filterValue.toLowerCase();
    if (filterValue === '') {
      this.listOfData = this.listOfAllData;
    }
    else {
      this.listOfData = this.listOfAllData.filter(
        (item: School) =>
          item.schoolName.includes(filterValue) ||
          item.schoolTaxCode.includes(filterValue)
      );
    }
  }

  openAddModule(id: string) {
    const modal = this.modalService.create({
      nzTitle: 'ĐĂNG KÝ MODULE',
      nzContent: RegisEduModuleComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '370px'
      },
    });

    modal.componentInstance.selecedId = id;
  }

  openListModulebySchool(id: string) {
    const modal = this.modalService.create({
      nzTitle: 'DANH SÁCH MODULE TRƯỜNG ĐANG SỬ DỤNG',
      nzContent: ListModulesComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '370px'
      },
    });

    modal.componentInstance.selecedId = id;
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_hst_vnEdu');
  }

  importExcel() {
    const modal = this.modalService.create({
      nzTitle: 'Import dữ liệu',
      nzContent: UploadComponent,
      nzWidth: 400,
      nzBodyStyle: {
        height: '70px'
      },
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
      // this.importDataImport(data);
    };
  }

  importDataImport(data: any) {
    // data.forEach(element => {

    //   element.registrationDate = moment(element.registrationDate).toISOString();
    //   element.expirationDate = moment(element.expirationDate).toISOString();

    //   // this.domainAPI.AddDomain(element).subscribe(res => {
    //   //   this.notification.create('success', 'Thành công', 'Bạn đã lưu thành công!');
    //   // }, (error) => {
    //   //   console.log(error);
    //   //   this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    //   // });
    // });
    // this.getAllDomains();
  }

  showCreate() {
    const modal = this.modalService.create({
      nzTitle: 'THÊM TRƯỜNG MỚI',
      nzContent: AddSchoolComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '420px'
      },
    });

    modal.afterClose.subscribe(res => {
      this.getSchool();
    });
  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA THÔNG TIN TRƯỜNG',
      nzContent: EditSchoolComponent,
      nzWidth: 800,
      nzBodyStyle: {
        height: '420px'
      },
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getSchool();
    });
  }

  confirmDelete(data) {
    this.eduEcosystemsServices.DeleteSchool(data._id.idSchool).subscribe((res) => {
      this.getSchool();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }

  onCurrentPageDataChange(listOfCurrentPageData: any[]): void {
    // this.listOfCurrentPageData = listOfCurrentPageData;
  }


}
