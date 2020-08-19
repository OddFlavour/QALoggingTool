import {Component, OnInit} from '@angular/core';
import {DfiBaseComponent} from './dfi-base.component';

@Component({
  selector: 'app-dfi-textbox',
  template: `
    <ng-container [formGroup]="form">
      <input type="text" class="form-control"
             [formControlName]="formItem.id"
      >
    </ng-container>
  `
})

export class DfiTextboxComponent extends DfiBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();

    // Set default value
    this.form.controls[this.formItem.id].setValue('');
  }
}
