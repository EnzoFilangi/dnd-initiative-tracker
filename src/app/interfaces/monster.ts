import {Entity} from "./entity";

export interface Monster extends Entity {
  hp: number,
  maxHp: number,
  xp: number,
  race: string,
  sheetURL: string,
  note: string
}
