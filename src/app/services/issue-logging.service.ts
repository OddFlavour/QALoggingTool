import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueLoggingService {

  constructor() { }

  getFormItems(): any[] {
    return [
      {
        type: 'textarea',
        id: 'Build Info',
        label: 'Build Info',
        resize: 'none'
      }
    ];
  }
}
