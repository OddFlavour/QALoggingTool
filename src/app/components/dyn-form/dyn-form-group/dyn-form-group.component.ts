import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dyn-form-group',
  templateUrl: 'dyn-form-group.component.html'
})

export class DynFormGroupComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() formItems: {
    // Required fields
    type: string,
    id: string,
    label: string
  }[];

  constructor() {
  }

  ngOnInit(): void {
  }

  deleteItem(itemId: string) {
    // TODO(jackson): array is by reference, so if we re-assign the array then we lose the original
  }
}
