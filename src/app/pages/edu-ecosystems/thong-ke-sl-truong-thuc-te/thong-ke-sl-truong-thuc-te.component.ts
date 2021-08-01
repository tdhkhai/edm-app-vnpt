import { Component, OnInit } from '@angular/core';
import { EduEcosystemsService } from 'src/app/core/services/edu-ecosystems.service';

@Component({
  selector: 'app-thong-ke-sl-truong-thuc-te',
  templateUrl: './thong-ke-sl-truong-thuc-te.component.html',
  styleUrls: ['./thong-ke-sl-truong-thuc-te.component.scss']
})
export class ThongKeSlTruongThucTeComponent implements OnInit {
  listOfData: any = [];
  listOfAllData: any = [];
  loading: boolean;

  constructor(
    private schoolAPI: EduEcosystemsService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.schoolAPI.GetCountSchoolByUnit().subscribe(res =>{
      this.listOfData = res
    });
  }


}
