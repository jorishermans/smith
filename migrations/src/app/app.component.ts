import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'migrations';
  show = false;

  valueChanged(event$: number) {
    if (event$ % 2 === 0) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
}
