import { Component } from '@angular/core';
import { HttpApiService } from './services/http-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private n : HttpApiService) {}
  title = 'spam2e';
}
