import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { EduEcosystemsService } from '../../../../core/services/edu-ecosystems.service';
import { ExcelToFileService } from '../../../../core/services/exceltofile.service';

@Component({
  selector: 'app-list-modules',
  templateUrl: './list-modules.component.html',
  styleUrls: ['./list-modules.component.scss']
})
export class ListModulesComponent implements OnInit {
  selectedId: string;
  selectedData: any = [];
  listOfData: any = [];
  loading: boolean;
  isSpinning = false;
  constructor(
    private excelToFile: ExcelToFileService,
    private notification: NzNotificationService,
    private modalService: NzModalService,
    private modal: NzModalRef,
    private eduEcosystemsServices: EduEcosystemsService,
  ) {
    this.isSpinning = true;
    setTimeout(() => {
      this.eduEcosystemsServices.GetSchool(this.selectedId).subscribe(
        (data) => {
          this.isSpinning = false;
          this.selectedData = data;
          // if (data.modules.moduleName === 'SLLĐT') {

          // }
          // data.modules.forEach(element => {
          //   if (element.moduleName === 'SLLĐT') {
          //     this.selectedData.push(element);1
          //   }
          // });
        }
      );
    }, 1000);
  }

  ngOnInit(): void {
  }

  exportExcel() {
    this.excelToFile.exportExcel(this.listOfData, 'danh_sach_module_theo_truong');
  }

  handleCancel() { this.modal.destroy(); }

  editModal(id: string) {

  }

  confirmDelete(moduleName: string, time: any) {
    if (moduleName === 'vnEdu') {
      this.eduEcosystemsServices.PullvnEduModule(this.selectedId, { moduleName, schoolYear: time }).subscribe(
        (res) => {
          this.handleCancel();
          this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
        }, (error) => {
          console.log(error);
          this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
        }
      );
    } else {
      this.eduEcosystemsServices.PullModule(this.selectedId, { moduleName, fromDate_toDate: time }).subscribe(
        (res) => {
          this.modal.destroy('OK');
          this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
        }, (error) => {
          console.log(error);
          this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
        }
      );
    }
  }

  cancel() { }

}
