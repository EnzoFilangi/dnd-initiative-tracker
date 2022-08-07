import {Component, Input} from '@angular/core';
import {Player} from "../../interfaces/player";

@Component({
  selector: 'app-player-box',
  templateUrl: './player-box.component.html',
  styleUrls: ['./player-box.component.css']
})
export class PlayerBoxComponent {
  @Input() player: Player | undefined;
}
