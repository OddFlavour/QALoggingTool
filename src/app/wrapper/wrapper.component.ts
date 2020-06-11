import {Component, OnInit} from '@angular/core';
import {IssueLoggingService} from '../services/issue-logging.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: []
})

/*
This wrapper class is needed because if all the code is written in app.component.ts, the service will keep getting refreshed, causing input
fields to not populate properly.
 */
export class WrapperComponent implements OnInit {

  form = new FormGroup({});
  formItems: any[];

  constructor(private issueLoggingService: IssueLoggingService) {
  }

  ngOnInit(): void {
    this.issueLoggingService.formItems$.subscribe(data => {
      this.formItems = data;
    });
  }
}
