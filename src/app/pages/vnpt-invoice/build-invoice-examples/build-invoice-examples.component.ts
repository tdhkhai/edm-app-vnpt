import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExcelToFileService } from 'src/app/core/services/exceltofile.service';
import { UploadComponent } from '../../shared/upload/upload.component';
import { ConfigInvoiceExampleComponent } from '../config-invoice-example/config-invoice-example.component';

@Component({
  selector: 'app-build-invoice-examples',
  templateUrl: './build-invoice-examples.component.html',
  styleUrls: ['./build-invoice-examples.component.scss']
})
export class BuildInvoiceExamplesComponent implements OnInit {
  code = `function myFunction() {
    document.getElementById("demo1").innerHTML = "Hello there!";
    document.getElementById("demo2").innerHTML = "How are you?";
  }`;

  // tslint:disable-next-line: no-inferrable-types
  fileUpload: File;
  fileContent: any;

  constructor(
    public dialog: MatDialog,
    private excelToFile: ExcelToFileService
  ) { }

  ngOnInit(): void {

  }

  showCreate() {
    const dialogRef = this.dialog.open(ConfigInvoiceExampleComponent, {
      height: '700px',
      width: '1300px',
    });
    dialogRef.afterClosed().subscribe(result => {

    });
  }

  exportExcel() {

  }

  importExcel() {
    const dialogRef = this.dialog.open(UploadComponent, {
      height: '250px',
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'undefined') {
        this.fileUpload = result;
        this.handleImport(this.fileUpload);
      }
    });
  }

  handleImport(file: File) {
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(file[0]);
    // tslint:disable-next-line: only-arrow-functions
    reader.onloadend = (e) => {
      this.fileContent = reader.result;
    };
    reader.readAsText(file);
  }

  reLoad() { }


}
