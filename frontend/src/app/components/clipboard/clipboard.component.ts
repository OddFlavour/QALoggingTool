import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit {

  @Input() form: FormGroup;

  @ViewChild('clipboard') clipboard: ElementRef;

  /*
  Cannot be private if it is needed in HTML
  */
  clipboardValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  onClickClipboard() {
    this.clipboard.nativeElement.focus();
    this.clipboard.nativeElement.select();
  }

  /**
   * Parses clipboard's raw value into a presentable string
   * @param formValue clipboard's raw value from form. Format: { 'key': 'value', ... }
   */
  parseClipboard(formValue: any): string {
    let ret = '';

    // tslint:disable-next-line:forin
    for (const key in formValue) {
      ret += key + ':\n';
      ret += formValue[key] + '\n\n';
    }

    return ret.trim();
  }
}
