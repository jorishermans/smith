import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-controlflow',
  templateUrl: './controlflow.component.html',
  styleUrls: ['./controlflow.component.scss']
})
export class ControlflowComponent {
  @Input() public show = false;
}
