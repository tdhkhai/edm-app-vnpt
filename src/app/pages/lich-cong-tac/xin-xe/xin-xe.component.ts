import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { XinxeService } from 'src/app/core/services/xinxe.service';
import { AddXinXeComponent } from '../add-xin-xe/add-xin-xe.component';
import { EditXinXeComponent } from '../edit-xin-xe/edit-xin-xe.component';

@Component({
  selector: 'app-xin-xe',
  templateUrl: './xin-xe.component.html',
  styleUrls: ['./xin-xe.component.scss']
})
export class XinXeComponent implements OnInit {
  listOfData: any = [];
  loading: boolean;
  constructor(
    private notification: NzNotificationService,
    private xinxeAPI: XinxeService,
    private modalService: NzModalService,
  ) { }

  ngOnInit(): void {
    this.getAllXinxe();
  }

  getAllXinxe() {
    this.xinxeAPI.GetAllXinxes().subscribe(res => {
      this.listOfData = res;
    });
  }

  showCreate() {
    const modal = this.modalService.create({
      nzTitle: 'THÊM XIN XE',
      nzContent: AddXinXeComponent,
      nzWidth: 640,
      nzBodyStyle: {
        height: '340px'
      },
    });

    modal.afterClose.subscribe(res => {
      this.getAllXinxe();
    });
  }

  editModal(selectedId: any) {
    const modal = this.modalService.create({
      nzTitle: 'CHỈNH SỬA THÔNG TIN CÔNG TÁC',
      nzContent: EditXinXeComponent,
      nzWidth: 640,
      nzBodyStyle: {
        height: '340px'
      },
    });
    modal.componentInstance.selectedId = selectedId;
    modal.afterClose.subscribe(res => {
      this.getAllXinxe();
    });
  }

  confirmDelete(data) {
    this.xinxeAPI.DeleteXinXe(data._id).subscribe((res) => {
      this.getAllXinxe();
      this.notification.create('success', 'Thành công', 'Bạn đã xóa thành công!');
    }, (error) => {
      console.log(error);
      this.notification.create('error', 'Lỗi', 'Đã xảy ra lỗi, vui lòng thử lại!');
    });
  }

  cancel() { }

}
