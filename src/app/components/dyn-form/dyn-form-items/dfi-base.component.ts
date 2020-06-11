import {Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

export class DfiBaseComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() formItem: {
    // Required fields
    type: string,
    id: string,
    label: string
  };

  constructor() {
  }

  ngOnInit(): void {
    this.form.addControl(this.formItem.id, new FormControl());
  }
}
