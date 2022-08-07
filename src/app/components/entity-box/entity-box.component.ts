import {Component, Input} from '@angular/core';
import {Entity} from "../../interfaces/entity";
import {Monster} from "../../interfaces/monster";
import {Player} from "../../interfaces/player";
import {EntityTypes} from "../../interfaces/enums";

@Component({
  selector: 'app-entity-box',
  templateUrl: './entity-box.component.html',
  styleUrls: ['./entity-box.component.css']
})
export class EntityBoxComponent {
  @Input() entity: Entity | undefined;
  @Input() index: number = -1;

  EntityTypes = EntityTypes;

  asMonster(val: Entity) : Monster { return (val as Monster); }
  asPlayer(val: Entity) : Player { return (val as Player); }
}
