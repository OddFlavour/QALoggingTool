import {Component, OnInit} from '@angular/core';
import {IssueLoggingService} from '../../services/issue-logging.service';

@Component({
  selector: 'app-template-menu',
  templateUrl: './template-menu.component.html',
  styleUrls: ['./template-menu.component.css']
})
export class TemplateMenuComponent implements OnInit {

  private file: File;

  constructor(private issueLoggingService: IssueLoggingService) {
  }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.file = event.target.files[0];
  }

  onClickUse() {
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
