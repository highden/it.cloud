import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'test';

  public ngOnInit() {
  	setTimeout ( () => {
  		this.title = 'trtrtr';
  	});
  }
}
