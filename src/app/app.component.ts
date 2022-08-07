import {Component} from '@angular/core';
import {Entity} from "./interfaces/entity";
import {EntityTypes} from "./interfaces/enums";
import {Monster} from "./interfaces/monster";
import {Player} from "./interfaces/player";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dnd-initiative-tracker';

  entities: Entity[] = [
    {
      type: EntityTypes.monster,
      initiative: 18,
      name: "Grog",
      hp: 20,
      maxHp: 20,
      xp: 50,
      race: "Gobelin",
      sheetURL: "https://www.google.com",
      note: "Lorem ipsum dolor sit amet"
    } as Monster,
    {
      type: EntityTypes.monster,
      initiative: 18,
      name: "Grog",
      hp: 0,
      maxHp: 20,
      xp: 50,
      race: "Gobelin",
      sheetURL: "https://www.google.com",
      note: ""
    } as Monster,
    {
      type: EntityTypes.player,
      initiative: 16,
      name: "Kleeck",
    } as Player
  ];
}
