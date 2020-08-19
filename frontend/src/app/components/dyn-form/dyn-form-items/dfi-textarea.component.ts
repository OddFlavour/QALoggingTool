import {Component, Input, OnInit} from '@angular/core';
import {DfiBaseComponent} from './dfi-base.component';

@Component({
  selector: 'app-dfi-textarea',
  template: `
    <ng-container [formGroup]="form">
      <textarea class="form-control"
                [formControlName]="formItem.id"
                [ngStyle]="{ 'resize': formItem.resize }"
      >
      </textarea>
    </ng-container>
  `
})

export class DfiTextAreaComponent extends DfiBaseComponent implements OnInit {

  @Input() formItem: {
    // Required fields from 'dfi-base.component.ts'
    type: string,
    id: string,
    label: string,

    resize: string
  };

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Set default value
    this.form.controls[this.formItem.id].setValue('');
  }
}
