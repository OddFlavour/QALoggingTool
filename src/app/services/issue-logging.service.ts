import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueLoggingService {

  private varFormItems = [
    {
      type: 'textarea',
      // id: 'build-info',
      id: 'Build Info',
      label: 'Build Info',
      resize: 'none'
    }
  ];

  // Stream sources
  private formItemsSource = new BehaviorSubject(this.varFormItems);

  // Observable streams
  formItems$ = this.formItemsSource.asObservable();

  dataChange(data) {
    this.formItemsSource.next(data);
  }
}
