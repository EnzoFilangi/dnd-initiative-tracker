import {Component, Input} from '@angular/core';
import {Monster} from "../../interfaces/monster";

import {faHandBackFist, faBriefcaseMedical, faIdBadge, faSkull, faStaffSnake} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-monster-box',
  templateUrl: './monster-box.component.html',
  styleUrls: ['./monster-box.component.css']
})
export class MonsterBoxComponent {
  @Input() monster: Monster | undefined;

  hurt = faHandBackFist;
  heal = faBriefcaseMedical;
  badge = faIdBadge;
  skull = faSkull;
  resurrect = faStaffSnake;

  hpManipulationField: number = 0;

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

  /**
   * Adds the value of `this.hpManipulationField` to the current health total of the monster.
   *
   * Capped at the max monster's HP
   */
  addHP(): void {
    if (this.monster) {
      this.monster.hp = Math.min(this.monster.maxHp, this.monster.hp + this.hpManipulationField);
    }
    this.hpManipulationField = 0;
  }

  /**
   * Subtracts the value of `this.hpManipulationField` from the current health total of the monster.
   *
   * Capped at 0
   */
  removeHP(): void{
    if (this.monster) {
      this.monster.hp = Math.max(0, this.monster.hp - this.hpManipulationField);
    }
    this.hpManipulationField = 0;
  }

  /**
   * Sets the current health of the monster to its maximum HP
   */
  setFullHp(): void {
    if (this.monster) {
      this.monster.hp = this.monster.maxHp
    }
  }
}
