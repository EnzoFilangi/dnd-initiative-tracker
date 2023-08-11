import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-round-counter',
  templateUrl: './round-counter.component.html',
  styleUrls: ['./round-counter.component.css']
})
export class RoundCounterComponent implements AfterViewInit {
  @Input() nextRoundObservable!: Observable<void>;
  @Input() resetRoundCounterObservable!: Observable<void>;
  roundCounter: number = 1;

  constructor() { }

  ngAfterViewInit(): void {
    this.nextRoundObservable.subscribe(() => this.roundCounter++);
    this.resetRoundCounterObservable.subscribe(() => this.roundCounter = 1);
  }

}
