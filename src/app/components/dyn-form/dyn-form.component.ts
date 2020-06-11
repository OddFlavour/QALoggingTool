import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dyn-form',
  template: `
    <form [formGroup]="form">
      <app-dyn-form-group [form]="form" [formItems]="formItems"></app-dyn-form-group>

<!--      <button type="submit" class="btn btn-outline-dark" (click)="onSubmit()">Submit</button>-->
    </form>
  `
})

export class DynFormComponent implements OnInit {

  @Input() formItems: any[];
  @Input() form: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
