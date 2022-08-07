import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Player} from "../../interfaces/player";

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.css']
})
export class PlayerBoxComponent implements OnChanges {
  @Input() player: Player | undefined;
  @Input() selected: boolean = false;

  @Output() skipMe = new EventEmitter<boolean>();

  /**
   * Tells the parent component to not skip this item (at the moment, there is no state where a player should be skipped)
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selected'].currentValue) {
      this.skipMe.emit(false);
    }
  }
}
