import {Component, Input, OnInit} from '@angular/core';
import {IssueLoggingService} from '../../services/issue-logging.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.css']
})
export class TemplateMenuComponent implements OnInit {

  @Input() formItems: any[];

  private file: File;

  constructor(private issueLoggingService: IssueLoggingService) {
  }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  onClickUse() {
    if (this.file) {
      const fileReader = new FileReader();

      // Callback for once file reader has read file
      fileReader.onload = (e) => {
        const parsing = JSON.parse(fileReader.result as string);

        this.issueLoggingService.dataChange(parsing);
      };

      // Initiate file read
      fileReader.readAsText(this.file);
    }
  }

  onClickExport() {
    const blob = new Blob([this.generateTemplate()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'qa-logging-template.txt');

    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'fileName.txt';
    // a.click();
    // setTimeout((...args) => {
    //   window.URL.revokeObjectURL(url);
    // }, 0);
  }

  private generateTemplate(): string {
    return JSON.stringify(this.formItems);
  }
}
