import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { feedState } from '@reative/state';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(http: HttpClient) {
    // user a different http connector
    // rather than axios
    // Reative.connector.http = http;
  }
}
