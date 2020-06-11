import {ChangeDetectorRef, Component, DoCheck, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IssueLoggingService} from '../services/issue-logging.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.css']
})

/*
This wrapper class is needed because if all the code is written in app.component.ts, the service will keep getting refreshed, causing input
fields to not populate properly.
 */
export class WrapperComponent implements OnInit, DoCheck {

  @ViewChild('newFieldInput') newFieldInput: ElementRef;
  @ViewChild('cpTextArea') cpTextArea: ElementRef;

  form = new FormGroup({});
  formItems: any[];

  cpTextAreaValue = '';
  invalidNewField = false;

  constructor(private issueLoggingService: IssueLoggingService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.formItems = this.issueLoggingService.getFormItems();
  }

  ngDoCheck(): void {
    // Update copy & paste text area
    this.cpTextAreaValue = this.getCPTextAreaValue(this.form.value);
  }

  onClickCPTextArea() {
    this.cpTextArea.nativeElement.focus();
    this.cpTextArea.nativeElement.select();
  }

  onKeyDown(event: KeyboardEvent) {
    if (this.invalidNewField) {
      this.invalidNewField = false;
    }

    if (event.key === 'Enter') {
      // Verify new item does not already exist and then add the new item
      const idValue = this.newFieldInput.nativeElement.value;

      if (false === this.formItems.map((x) => x.id).includes(idValue)) {
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

  private getCPTextAreaValue(formValue: any): string {
    let ret = '';

    // tslint:disable-next-line:forin
    for (const key in formValue) {
      ret += key + ':\n';
      ret += formValue[key] + '\n\n';
    }

    return ret.trim();
  }
}
