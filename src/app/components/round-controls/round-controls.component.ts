import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-round-controls',
  templateUrl: './round-controls.component.html',
  styleUrls: ['./round-controls.component.css']
})
export class RoundControlsComponent implements OnInit {
  @Output() goToTopOfRound = new EventEmitter<void>();
  @Output() resetRoundCounter = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
