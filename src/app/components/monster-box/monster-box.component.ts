import {Component, Input} from '@angular/core';
import {Monster} from "../../interfaces/monster";

import {faMinus, faPlus, faIdBadge} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-monster-box',
  templateUrl: './monster-box.component.html',
  styleUrls: ['./monster-box.component.css']
})
export class MonsterBoxComponent {
  @Input() monster: Monster | undefined;

  minus = faMinus;
  plus = faPlus;
  badge = faIdBadge;

  /**
   * Opens the refsheet of the monster in a new tab
   */
  openSheet() {
    window.open(this.monster?.sheetURL, "_blank");
  }

  /**
   * Returns the percentage of health left for this monster
   */
  getHealthPercentage(): string {
    if (this.monster){
      return Math.max((this.monster.hp / this.monster.maxHp) * 100, 0) + "%";
    }
    return "0%";
  }
}
