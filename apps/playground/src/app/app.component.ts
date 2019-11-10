import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reative } from '@reative/records';

@Component({
  selector: 'rr',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(http: HttpClient) {
    Reative.connector.http = http;
  }
}
