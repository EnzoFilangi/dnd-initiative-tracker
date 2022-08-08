import {Component, Input} from '@angular/core';
import {Entity} from "../../interfaces/entity";
import {EntityTypes} from "../../interfaces/enums";
import {Monster} from "../../interfaces/monster";

@Component({
  selector: 'app-xp-total',
  templateUrl: './xp-total.component.html',
  styleUrls: ['./xp-total.component.css']
})
export class XpTotalComponent {

  @Input() entityList: Entity[] = [];

  constructor() { }

  /**
   * Returns the total amount of XP of the monsters
   */
  getXpTotal(): number {
    return this.entityList
      .filter((e) => e.type === EntityTypes.monster)                // Only keep the monsters
      .reduce((total, e) => total + (e as Monster).xp, 0);  // Get the total of the XP values in the list
  }

  /**
   * Returns the total amount of XP of the monsters divided by the number of players
   *
   * Returns 0 if there are no players
   */
  getXpPerPlayer(): number {
    const numberOfPlayers = this.entityList.filter((e) => e.type === EntityTypes.player).length;
    // If there are no players, return 0
    return numberOfPlayers ? this.getXpTotal() / numberOfPlayers : 0;
  }
}
