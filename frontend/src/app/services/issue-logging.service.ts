import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Template} from '../components/template-menu/template-menu.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IssueLoggingService {

  // TODO(jackson): use global constants
  private BASE_URL = 'http://localhost:3000/api';

  private varFormItems = [
    {
      type: 'textarea',
      // id: 'build-info',
      id: 'Build Info',
      label: 'Build Info',
      resize: 'none'
    }
  ];

  // Stream sources
  private formItemsSource = new BehaviorSubject(this.varFormItems);

  // Observable streams
  formItems$ = this.formItemsSource.asObservable();

  private constructor(private http: HttpClient) {
  }

  dataChange(data) {
    this.formItemsSource.next(data);
  }

  getTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>(this.BASE_URL + '/templates');
  }
}
