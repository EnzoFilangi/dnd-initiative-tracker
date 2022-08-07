import {EntityTypes} from "./enums";

export interface Entity {
  type: EntityTypes,
  initiative: number,
  name: string
}
