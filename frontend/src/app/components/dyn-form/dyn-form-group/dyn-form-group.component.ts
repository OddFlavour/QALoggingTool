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
    /*
    Array is by reference, so if we re-assign the array then we lose the original.
    In this case, we can no longer add new elements, since the array is passed to 'dyn-form' by reference
     */
    for (let i = 0; i < this.formItems.length; i++) {
      const curr = this.formItems[i];
      if (curr.id === itemId) {
        this.form.removeControl(curr.id);
        this.formItems.splice(i, 1);

        // Early exit
        break;
      }
    }
  }
}
