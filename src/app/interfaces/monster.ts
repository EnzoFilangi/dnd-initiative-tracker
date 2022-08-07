import {Entity} from "./entity";

export interface Monster extends Entity {
  hp: number,
  maxHp: number,
  xp: number,
  race: string,
  sheetURL: string,
  attacking: string,
  extra: string
}
