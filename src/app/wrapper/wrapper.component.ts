import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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

  // TODO(jackson): perhaps these should be their own separate components?
  @ViewChild('newFieldInput') newFieldInput: ElementRef;

  form = new FormGroup({});
  formItems: any[];

  invalidNewField = false;

  constructor(private issueLoggingService: IssueLoggingService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.formItems = this.issueLoggingService.getFormItems();
  }

  onNewFieldInputKeyDown(event: KeyboardEvent) {
    if (this.invalidNewField) {
      this.invalidNewField = false;
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
      if (idValue && false === this.formItems.map((x) => x.id).includes(idValue)) {
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

      // Update ngDoCheck()
      this.changeDetectorRef.detectChanges();

      // TODO(jackson): Transfer focus to the new field
    }
  }

  private generateId(camelCasedString: string): string {
    return camelCasedString.split(' ').join('-').toLowerCase();
  }
}
