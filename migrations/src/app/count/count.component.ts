import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.scss']
})
export class CountComponent {
  @Output() public valueChanged = new EventEmitter<number>();
  public counter = 0;

  public increment() {
    this.counter++;
    this.valueChanged.emit(this.counter);
  }
}
