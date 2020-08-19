import {Component, Input, OnInit} from '@angular/core';
import {IssueLoggingService} from '../../services/issue-logging.service';
import {saveAs} from 'file-saver';
import {FormGroup} from '@angular/forms';

export interface Template {
  name: string;
  json: string;
}

@Component({
  selector: 'app-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.css']
})

export class TemplateMenuComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() formItems: any[];

  private file: File;
  templates: Template[];

  constructor(private issueLoggingService: IssueLoggingService) {
  }

  ngOnInit(): void {
    this.issueLoggingService.getTemplates().subscribe(
      value => {
        this.templates = value;
      },
      error => {
        console.log(error);
      });
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  onClickUse() {
    if (this.file) {
      const fileReader = new FileReader();

      // Callback for once file reader has read file
      fileReader.onload = (e) => {
        this.updateILS(fileReader.result as string);
      };

      // Initiate file read
      fileReader.readAsText(this.file);
    }
  }

  onClickExport() {
    const blob = new Blob([this.generateTemplate()], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'qa-logging-template.txt');
  }

  onTemplateSelection(template: Template) {
    this.updateILS(template.json);
  }

  private updateILS(raw: string) {
    const parsing = JSON.parse(raw);

    // Whenever we use a template, we have to clear our form
    // TODO(jackson): there's probably a better way to clear our form
    for (const key of this.formItems) {
      this.form.removeControl(key.id);
    }

    this.issueLoggingService.dataChange(parsing);
  }

  private generateTemplate(): string {
    return JSON.stringify(this.formItems);
  }
}
