import {Component, Input} from '@angular/core';
import {Monster} from "../../interfaces/monster";

@Component({
  selector: 'app-monster-box',
  templateUrl: './monster-box.component.html',
  styleUrls: ['./monster-box.component.css']
})
export class MonsterBoxComponent {
  @Input() monster: Monster | undefined;
}
