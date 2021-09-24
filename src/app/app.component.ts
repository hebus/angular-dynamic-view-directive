import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  test = 'Angular ' + VERSION.major;

  hello = {type: 'hello', inputs: {name: this.name}};
}
