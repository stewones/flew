import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '@reative/records';

@Component({
  selector: 'rr',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(http: HttpClient) {
    // Config.options.connector.http = http;
  }
}
