import {Component, DoCheck, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.component.html',
  styleUrls: ['./clipboard.component.css']
})
export class ClipboardComponent implements OnInit, DoCheck {

  @Input() form: FormGroup;

  @ViewChild('clipboard') clipboard: ElementRef;

  clipboardValue = '';

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    // Update clipboard
    this.clipboardValue = this.getClipboardValue(this.form.value);
  }

  onClickClipboard() {
    this.clipboard.nativeElement.focus();
    this.clipboard.nativeElement.select();
  }

  private getClipboardValue(formValue: any): string {
    let ret = '';

    // tslint:disable-next-line:forin
    for (const key in formValue) {
      ret += key + ':\n';
      ret += formValue[key] + '\n\n';
    }

    return ret.trim();
  }
}
