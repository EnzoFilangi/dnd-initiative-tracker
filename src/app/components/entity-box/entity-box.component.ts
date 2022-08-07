import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Entity} from "../../interfaces/entity";
import {Monster} from "../../interfaces/monster";
import {Player} from "../../interfaces/player";
import {EntityTypes} from "../../interfaces/enums";

import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-entity-box',
  templateUrl: './entity-box.component.html',
  styleUrls: ['./entity-box.component.css']
})
export class EntityBoxComponent {
  @Input() entity: Entity | undefined;
  @Input() index: number = -1;
  @Input() selected: boolean = false;

  @Output() skipMe = new EventEmitter<boolean>();

  trash = faTrash;

  EntityTypes = EntityTypes;

  /**
   * Casts the value from type Entity to type Monster for manipulation in the template
   * @param val
   */
  asMonster(val: Entity) : Monster { return (val as Monster); }
  /**
   * Casts the value from type Entity to type Player for manipulation in the template
   * @param val
   */
  asPlayer(val: Entity) : Player { return (val as Player); }

  /**
   * Propagates the event up the call stack
   * @param $event
   */
  skipThis($event: boolean): void {
    this.skipMe.emit($event)
  }
}
