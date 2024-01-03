import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ValidationErrors, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private http: HttpClient) { }

  uniqueValidatorFn (field: string) {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.http.get(environment.backendRoot + '/utilities/unique/' + field + '/' + control.value)
      .pipe(map(value => value ? null : {'unique':true}))
    }
  }
}
