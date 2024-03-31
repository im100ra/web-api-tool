import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PrettyJson } from './pipes/pretty-json.pipe';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HttpClientModule,
    ReactiveFormsModule,
    PrettyJson,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'web-api-tool';
  form = new FormGroup({
    url: new FormControl('', { validators: [Validators.required] }),
    method: new FormControl('POST', { validators: [Validators.required] }),
    body: new FormControl('', { validators: [Validators.required] }),
  });

  response!: object;
  constructor(private _http: HttpClient) {}

  submitForm() {
    const formValue: request = this.form.value as request;

    if (formValue.body.length > 0) {
      try {
        formValue.body = JSON.parse(formValue.body);
      } catch (e) {
        return false;
      }
    }
    if (
      !(formValue.url.includes('http://') || formValue.url.includes('https://'))
    ) {
      formValue.url = 'http://' + formValue.url;
    }
    this._http
      .request(formValue.method, formValue.url, { body: formValue.body })
      .subscribe({
        next: (info) => {
          this.response = info;
        },
        error: (error) => {
          this.response = error;
        },
      });
    return true;
  }
}

interface request {
  url: string;
  method: 'POST' | 'GET' | 'PUT' | 'PATCH' | 'OPTIONS';
  body: string;
}
