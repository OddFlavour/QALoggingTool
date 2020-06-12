import {ApplicationRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-new-field-adder',
  templateUrl: './new-field-adder.component.html',
  styleUrls: ['./new-field-adder.component.css']
})
export class NewFieldAdderComponent implements OnInit {

  @Input() formItems: any[];
  @ViewChild('newFieldInput') newFieldInput: ElementRef;

  /*
  Cannot be private if it is needed in HTML
  */
  invalidNewField = false;

  constructor(private applicationRef: ApplicationRef) {
  }

  ngOnInit(): void {
  }

  onInputKeyDown(event: KeyboardEvent) {
    if (this.invalidNewField) {
      this.invalidNewField = false;
    }

    if (event.key === 'ArrowUp') {
      console.log(this.formItems);
    }
    if (event.key === 'Enter') {
      /*
      Reason for not using 'this.generateId()': In the clipboard, it's using the key from the form, and
      the key used directly corresponds to 'idValue'.

      E.g If 'idValue == "Build Info"' and we use 'this.generateId()', then the clipboard will show 'build-info:'

      If want to use 'this.generateId()' then the clipboard has to search for the label value.
       */
      const idValue = this.newFieldInput.nativeElement.value;

      // Verify new item does not already exist and then add the new item
      if (idValue && this.isValidFieldName(idValue)) {
        this.formItems.push({
          type: 'textarea',
          id: idValue,
          label: idValue,
          resize: 'none'
        });
      } else {
        this.invalidNewField = true;
      }

      // Reset the value of the input field
      this.newFieldInput.nativeElement.value = '';

      /*
      Manually trigger a detection. This is intended to update the clipboard when a new field has been added.

      ChangeDetectorRef does not work because it only applies the detection to this component and its children.

      TODO(jackson): use a different method than ApplicationRef to avoid updating more than needed
       */
      this.applicationRef.tick();

      // TODO(jackson): Transfer focus to the new field
    }
  }

  private isValidFieldName(fieldName: string): boolean {
    // Not a duplicate
    if (true === this.formItems.map((x) => x.id).includes(fieldName)) {
      return false;
    }

    // Not just a number, includes at least one letter *Helps keep clipboard in order
    // Implementing this way with charCode is a lot faster than regex
    let temp = false;
    for (let i = 0; i < fieldName.length; i++) {
      const code = fieldName.charCodeAt(i);

      // Found a letter
      if ((code >= 97 && code <= 122)
        || (code >= 65 && code <= 90)) {
        temp = true;
        break;
      }
    }
    if (!temp) {
      return false;
    }

    // Default to it is valid
    return true;
  }

  private generateId(camelCasedString: string): string {
    return camelCasedString.split(' ').join('-').toLowerCase();
  }
}
