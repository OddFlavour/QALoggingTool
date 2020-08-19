import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DynFormComponent} from './components/dyn-form/dyn-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {DynFormGroupComponent} from './components/dyn-form/dyn-form-group/dyn-form-group.component';
import {DfiTextboxComponent} from './components/dyn-form/dyn-form-items/dfi-textbox.component';
import {WrapperComponent} from './wrapper/wrapper.component';
import {DfiTextAreaComponent} from './components/dyn-form/dyn-form-items/dfi-textarea.component';
import { ClipboardComponent } from './components/clipboard/clipboard.component';
import { TemplateMenuComponent } from './components/template-menu/template-menu.component';
import { NewFieldAdderComponent } from './components/new-field-adder/new-field-adder.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    DynFormComponent,
    DynFormGroupComponent,
    DfiTextboxComponent,
    WrapperComponent,
    DfiTextAreaComponent,
    ClipboardComponent,
    TemplateMenuComponent,
    NewFieldAdderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
